const router = require('express').Router()

const loginController = require('../controllers/loginController')
const loginValidation = require('../validations/loginValidation')

router.post('/signin', loginValidation.signIn, loginController.signIn)
      .get('/login', (req, res) => res.status(200).send({
            message: 'Opa.'
        }))

module.exports = router;
