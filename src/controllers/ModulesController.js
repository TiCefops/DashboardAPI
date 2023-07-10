const admin = require('../utils/firebaseConfig');

class ModulesController {
  async getModules(req, res) {
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

  async getDisciplinesByModule(req, res) {
    const { courseId, id } = req.params;
    
    const collectionRef = admin.firestore().collection('modulos')
      .doc(courseId)
      .collection("modulos")
      .doc(id)
      .collection("disciplinas")    

    collectionRef.get().then((snapshot) => {
      const modules = [];
      snapshot.forEach((doc) => {
        modules.push(doc.data())
      })

      res.json(modules)
    }).catch((err) => {
      res.status(500).json({error: 'Erro ao obter disciplinas', err})
    })
  
  }

  async getModuleById(req, res) {
     const { courseId, id } = req.params;
    
    try {
      const documentRef = admin.firestore().collection('modulos')
        .doc(courseId)
        .collection("modulos")
        .doc(id)   
      
      const documentSnapshot = await documentRef.get()
      
      if (!documentSnapshot.exists) {
        return res.status(404).json({ error: 'Documento não encontrado.' });
      }
      
        const documentData = documentSnapshot.data();
        res.json(documentData);
    } catch(err) {
      res.status(500).json({error: 'Erro ao obter disciplinas', err})
    }
  
  }

  async updateModule(req, res) {
    const { classId, id } = req.params;
    const { nome, ativo, disciplinas } = req.body;

    const moduleRef = admin.firestore().collection('modulos')
      .doc(classId)
      .collection("modulos")
      .doc(id)
    
    const disciplinesRef = admin.firestore().collection('modulos')
      .doc(classId)
      .collection("modulos")
      .doc(id)
      .collection("disciplinas")

    moduleRef.update({ nome, ativo })
      .then(() => {
        res.json({ message: 'Turma atualizada com sucesso' })
      })
      .catch((error) => {
        res.status(500).json({ error: 'Erro ao atualizar turma:', error })
      })
    
    disciplinesRef.update(disciplinas)
      .then(() => {
        res.json({ message: 'disciplinas atualizada com sucesso' })
      })
      .catch((error) => {
        res.status(500).json({ error: 'Erro ao atualizar disciplinas:', error })
      })
  }

  async deleteModule(req, res) {
    const { id } = req.params;

    const moduleRef = admin.firestore().collection('modulos')
      .doc(classId)
      .collection("modulos")
      .doc(id)

    moduleRef.delete()
  }
}

module.exports = new ModulesController();