const router = require('express').Router()

router.get('/', (req, res) => res.status(200).send(
    {
        message: 'Server\'s on.'
    }))
    .get('*', (req, res) => res.status(200).send(
        {
            message: 'Route not found.'
        }))
        
module.exports = router