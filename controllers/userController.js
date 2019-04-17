const bcrypt = require('bcrypt')
const User = require('../models').User
const Phone = require('../models').Phone
const jwt = require('jsonwebtoken');
const secret = require('../secret');



const create = async (req, res) => {
    try {
        var salt = bcrypt.genSaltSync(11)
        var hash = bcrypt.hashSync(req.body.senha, salt)
        var token = jwt.sign({
            data: req.body.email
          }, secret.secret, { expiresIn: 60 * 30 });
		
        let user = await User.create({
            name: req.body.nome,
            email: req.body.email,
            password: hash,
			lastLogin: new Date(),
			token: token
        })
        const phones = req.body.telefones
        phones.forEach(element => {
            Phone.create({
                number: element.numero,
                ddd: element.ddd,
                userId: user.id
            })
		});
		user.password = undefined
		user.name = undefined
		user.email = undefined
        return res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    create
}