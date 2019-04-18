const util = require('./util')
const User = require('../models').User

function checkEmptyPhone(res, phones) {
    phones.forEach(element => {
        if (element.numero == undefined || element.numero == "") {
            return res.status(400).send({
                mensagem: `O número de um dos telefones está vazio`
            })
        }
        if (element.ddd == undefined || element.ddd == "") {
            return res.status(400).send({
                mensagem: `O DDD de um dos telefones está vazio`
            })
        }
    });
}

async function checkEmail(res, email) {
    var user = await User.findOne({ where: {email: email} })
    if (user) {
        return res.status(400).send({
            mensagem: `E-mail já existente`
        })
    }
}

const signUp = async (req, res, next) => {
    util.checkEmpty(res, req.body.nome, 'nome')
    util.checkEmpty(res, req.body.email, 'email')
    util.checkEmpty(res, req.body.senha, 'senha')
    checkEmptyPhone(res, req.body.telefones)
    await checkEmail(res, req.body.email)
    next()
}

const signIn = (req, res, next) => {
    util.checkEmpty(res, req.body.email, 'email')
    util.checkEmpty(res, req.body.senha, 'senha')
    next()
}

module.exports = {
    signIn,
    signUp
}