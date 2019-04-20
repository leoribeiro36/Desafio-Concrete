const router = require('express').Router();

const loginController = require('../controllers/loginController');
const loginValidation = require('../validations/loginValidation');

router.post('/signin', loginValidation.signIn, loginController.signIn)
      .post('/signup', loginValidation.signUp, loginController.signUp);

module.exports = router;
