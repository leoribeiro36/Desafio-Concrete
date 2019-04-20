const util = require('./util');
const User = require('../models').User;
const bcrypt = require('bcrypt');

function checkEmptyPhone(phones) {
    var message;
    phones.forEach(element => {
        if (element.numero === undefined || element.numero === "") {
            message = {
                status: 400,
                mensagem: `O número de um dos telefones está vazio`
            };
        }
        if (element.ddd === undefined || element.ddd === "") {
            message = {
                status: 400,
                mensagem: `O DDD de um dos telefones está vazio`
            };
        }
    });
    return message;
}

async function checkEmail(req) {
    var user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        return {
            status: 400,
            mensagem: `E-mail já existente`
        };
    }
}

async function checkIfExists(req, message) {
    var user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return {
            status: 401,
            mensagem: message
        };
    }
}

async function verifyPassword(req) {
    var user = await User.findOne({ where: { email: req.body.email } });
    const match = await bcrypt.compare(req.body.senha, user.password);
    if (!match) {
        return {
            status: 401,
            mensagem: `Usuário e/ou senha inválidos`
        };
    }
}

const signUp = async (req, res, next) => {
    try {
        var check = util.checkEmpty(res, req.body.nome, 'nome');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.email, 'email');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.senha, 'senha');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = checkEmptyPhone(req.body.telefones);
        console.log(check)
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await checkEmail(req);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        next();
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

const signIn = async (req, res, next) => {
    try {
        var check = util.checkEmpty(res, req.body.email, 'email');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.senha, 'senha');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await checkIfExists(req, `Usuário e/ou senha inválidos`);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await verifyPassword(req);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        next();
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

module.exports = {
    signIn,
    signUp
};