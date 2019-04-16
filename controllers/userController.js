const bcrypt = require('bcrypt')
const User = require('../models').User
const Phone = require('../models').Phone



const create = async (req, res) => {
    try {
        console.log(req.body)
        var salt = bcrypt.genSaltSync(11)
        var hash = bcrypt.hashSync(req.body.senha, salt)

        const user = await User.create({
            name: req.body.nome,
            email: req.body.email,
            password: hash
        })
        const phones = req.body.telefones
        phones.forEach(element => {
            Phone.create({
                number: element.numero,
                ddd: element.ddd,
                userId: user.id
            })
        });
        return res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    create
}