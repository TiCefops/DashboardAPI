const admin = require('../utils/firebaseConfig');

class TurmasController {
  async NewTurma(req, res) {
    try {
      const newTurmaRef = await admin.firestore().collection('turmas').add(req.body);
      const turmaId = newTurmaRef.id;

      await newTurmaRef.update({ id: turmaId });

      const newTurmaDoc = await newTurmaRef.get();
      const newTurmaData = newTurmaDoc.data();
      res.json(newTurmaData);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar turma:', error });
    }
  }

  async getTurmas(req, res) {
    const collectionRef = admin.firestore().collection('turmas');

    collectionRef
      .get()
      .then((snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push(doc.data());
      });

      res.json(documents);
    }).catch((error) => {
      res.status(500).json({ error: 'Erro ao obter turmas:', error })
    })
  }

  async getTurmaById(req, res) {
  const { id } = req.params;

  try {
    const documentRef = admin.firestore().collection('turmas').doc(id);
    const documentSnapshot = await documentRef.get();

    if (!documentSnapshot.exists) {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    
      const documentData = documentSnapshot.data();
      res.json(documentData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter turma:', error });
  }
}


  async getTurmasByCourse(req, res) {
    const { id } = req.params;
    const collectionRef = admin.firestore().collection('turmas').where("courseId", "==", id);

    collectionRef
      .get()
      .then((snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push(doc.data());
      });

      res.json(documents);
    }).catch((error) => {
      res.status(500).json({ error: 'Erro ao obter turmas:', error })
    })
  }

  async getTurmaModules(req, res) {
    const { courseId } = req.params;
    const collectionRef = admin.firestore().collection('modulos')
      .doc(courseId)
      .collection("modulos")

    collectionRef.get().then((snapshot) => {
      const modules = [];
      snapshot.forEach((doc) => {
        modules.push(doc.data())
      })

      res.json(modules)
    }).catch((err) => {
      res.status(500).json({error: 'Erro ao obter modulos', err})
    })
  }

  async updateClass(req, res) {
    const { id } = req.params;
    const { nome, curso, modulos } = req.body;

    const classRef =  admin.firestore().collection('turmas').doc(id)

    classRef.update({ nome, curso, modulos })
      .then(() => {
        res.json({ message: 'Turma atualizada com sucesso' })
      })
      .catch((error) => {
        res.status(500).json({ error: 'Erro ao atualizar turma:', error })
    })
  }

  async deleteClass(req, res) {
    const { id } = req.params;
  
    const db = admin.firestore();
  
    const classRef = db.collection('turmas').doc(id);
    await classRef.delete();
  
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('turma', '==', id).get();
  
    const batch = db.batch();
    const deleteAuthUsersPromises = [];

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      deleteAuthUsersPromises.push(admin.auth().deleteUser(doc.id));
    });
  
    await batch.commit();

    await Promise.all(deleteAuthUsersPromises);
  
    res.status(200).send('Classe e usuários deletados com sucesso.');
  }
  
}

module.exports = new TurmasController();