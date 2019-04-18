const router = require('express').Router()
const userController = require('../controllers/userController')
const userValidation = require('../validations/userValidation')

router.get('/buscarUsuario/:id', userValidation.findUser, userController.findUser)

module.exports = router;
