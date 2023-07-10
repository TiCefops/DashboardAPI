const admin = require('../utils/firebaseConfig');

class UsersController {
  async createUser(req, res) {
    const { email, password, cpf, nome, turma, cursos } = req.body;

    admin
    .auth()
    .createUser({
      email: email,
      password: password,
      emailVerified: false,
    })
    .then((userRecord) => {
      const uid = userRecord.uid;

      // Adicionar o usuário à coleção "users"
      const usersCollection = admin.firestore().collection('users');
      const userData = {
        uid: uid,
        email: email,
        cpf: cpf,
        nome: nome,
        turma: turma,
        cursos: cursos
      };

      return usersCollection.doc(uid).set(userData);
    })
    .then(() => {
      res.status(200).json({ message: 'Usuário criado com sucesso.' });
    })
    .catch((error) => {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    });
  }

  async getUserByUid(req, res) {
    const { id } = req.params;

    try {
      const documentRef = admin.firestore().collection('users').doc(id);
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

  async getUsers(req, res) {
    const collectionRef = admin.firestore().collection('users');

    collectionRef
      .get()
      .then((snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        documents.push(doc.data());
      });

      res.json(documents);
    }).catch((error) => {
      res.status(500).json({ error: 'Erro ao obter usuários:', error })
    })
  }

  async getUsersByClass(req, res) {
    const { class_id } = req.params;
    const collectionRef = admin.firestore().collection('users')
      .where('turma', '==', class_id)
    
    collectionRef.get().then((snapshot) => {
      const documents = []
      snapshot.forEach((doc) => {
        documents.push(doc.data())
      })

      res.json(documents)
    }).catch((err) => {
      res.status(400).json({error: 'Erro ao obter usuários', err })
    })
    
  }

  async updateAuth(req, res) {
    const { id } = req.params;
    const { email, password } = req.body;

    admin.auth().updateUser(id, { email, password })
    .then((userRecord) => {
      res.json({ message: 'Usuário atualizado com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, cpf, email } = req.body;

    const userRef =  admin.firestore().collection('users').doc(id)

    userRef.update({ name, cpf, email })
      .then(() => {
        res.json({ message: 'Usuário atualizado com sucesso' })
      })
      .catch((error) => {
        res.status(500).json({ error: 'Erro ao atualizar usúario:', error })
    })
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    const userRef = admin.firestore().collection('users').doc(id);

    userRef.delete()
      .then(() => {
        return admin.auth().deleteUser(id)
      }).then(() => {
        res.status(204)
      }).catch((error) => {
        res.status(500).json({ error: 'Erro ao excluir usuário' })
      })
  }

  async deleteMany(req, res) {
    
  }
}

module.exports = new UsersController();