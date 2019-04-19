const util = require('./util');
const User = require('../models').User;
const bcrypt = require('bcrypt');

function checkEmptyPhone(res, phones) {
    phones.forEach(element => {
        if (element.numero == undefined || element.numero == "") {
            return res.status(400).send({
                mensagem: `O número de um dos telefones está vazio`
            });
        }
        if (element.ddd == undefined || element.ddd == "") {
            return res.status(400).send({
                mensagem: `O DDD de um dos telefones está vazio`
            });
        }
    });
}

async function checkEmail(res, req) {
    var user = await User.findOne({ where: {email: req.body.email} });
    if (user) {
        return res.status(400).send({
            mensagem: `E-mail já existente`
        });
    }
}

async function checkIfExists(res, req, message) {
    var user = await User.findOne({ where: {email: req.body.email} });
    if (!user) {
        return res.status(401).send({
            mensagem: message
        });
    }
}

async function verifyPassword(res, req) {
    var user = await User.findOne({ where: {email: req.body.email} });
    const match = await bcrypt.compare(req.body.senha, user.password);
    if (!match) {
        return res.status(401).send({
            mensagem: `Usuário e/ou senha inválidos`
        });
    }
}

const signUp = async (req, res, next) => {
    util.checkEmpty(res, req.body.nome, 'nome');
    util.checkEmpty(res, req.body.email, 'email');
    util.checkEmpty(res, req.body.senha, 'senha');
    checkEmptyPhone(res, req.body.telefones);
    await checkEmail(res, req);
    next();
};

const signIn = async (req, res, next) => {
    util.checkEmpty(res, req.body.email, 'email');
    util.checkEmpty(res, req.body.senha, 'senha');
    await checkIfExists(res, req, `Usuário e/ou senha inválidos`);
    await verifyPassword(res, req);
    next();
};

module.exports = {
    signIn,
    signUp
};