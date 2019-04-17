
const User = require('../models').User
const bcrypt = require('bcrypt')

const  signIn = async (req, res) => {
    var user = await User.findOne({ where: {email: req.body.email} })
    if (!user) {
        return res.status(400).send({
            mensagem: `Usuário e/ou senha inválidos`
        })
    }
    const match = await bcrypt.compare(req.body.senha, user.password);
    if (!match) {
        return res.status(400).send({
            mensagem: `Usuário e/ou senha inválidos`
        })
    }

    return res.status(200).send({
        mensagem: `logado`
    })
}

module.exports = {
    signIn
}