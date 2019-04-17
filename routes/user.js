const router = require('express').Router()
const userController = require('../controllers/userController')
const userValidation = require('../validations/userValidation')

router.post('/user', userValidation.create, userController.create)

module.exports = router;
