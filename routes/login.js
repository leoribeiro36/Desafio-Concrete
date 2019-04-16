const router = require('express').Router()

const userController = require('../controllers/userController')

router.post('/login', userController.create)
      .get('/login', (req, res) => res.status(200).send({
            message: 'Opa.'
        }))

module.exports = router;
