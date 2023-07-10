const { Router } = require('express');

const UsersController = require('./controllers/UsersController');
const TurmasController = require('./controllers/TurmasController');
const ModulesController = require('./controllers/ModulesController');

const router = Router()

router.post('/users', UsersController.createUser)
router.get('/users', UsersController.getUsers)
router.get('/users/:class_id', UsersController.getUsersByClass)
router.put('/user/:id', UsersController.updateUser)
router.put('/users/:id', UsersController.updateAuth)
router.delete('/users/:id', UsersController.deleteUser)
router.delete('/users/:id', UsersController.deleteUser)

// Turmas
router.post('/turmas', TurmasController.NewTurma)
router.get('/turmas', TurmasController.getTurmas)
router.get('/turma/:id', TurmasController.getTurmaById)
router.get('/turmas/:id', TurmasController.getTurmasByCourse)
router.get('/modules/:courseId', TurmasController.getTurmaModules)
router.put('/turmas/:id', TurmasController.updateClass)
router.delete('/turmas/:id', TurmasController.deleteClass)

// Modulos
router.get('/modulos/:courseId', ModulesController.getModules)
router.get('/modulos/:courseId/:id', ModulesController.getDisciplinesByModule)
router.get('/modulo/:courseId/:id', ModulesController.getModuleById)
router.put('/modulos/:courseId/:id', ModulesController.updateModule)
router.delete('/modulos/:courseId/:id', ModulesController.deleteModule)

module.exports = router