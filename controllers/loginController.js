const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const User = require('../models').User;
const Phone = require('../models').Phone;

function generateToken(req) {
    var token = jwt.sign({
        data: req.body.email,
        senha: req.body.senha
    }, secret.secret, { expiresIn: 60 * 30 });
    return token;
}

function encrypt(element) {
    var salt = bcrypt.genSaltSync(11);
    var hash = bcrypt.hashSync(element, salt);
    return hash;
}

const signUp = async (req, res) => {
    try {
        var encryptPassword = encrypt(req.body.senha);
        var token = generateToken(req);
        var phones = req.body.telefones;
        var user = await User.create({
            name: req.body.nome,
            email: req.body.email,
            password: encryptPassword,
            lastLogin: new Date(),
            token: token
        });
        phones.forEach(element => {
            Phone.create({
                number: element.numero,
                ddd: element.ddd,
                userId: user.id
            });
        });
        user.name = undefined;
        user.email = undefined;
        user.password = undefined;
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

const signIn = async (req, res) => {
    try {
        var token = generateToken(req);
        await User.update({
            token: token,
            lastLogin: new Date()
        },
            {
                where: {
                    email: req.body.email
                }
            });
        var userRerutn = await User.findOne({
            attributes: ['id', 'token', 'lastLogin', 'createdAt', 'updatedAt'],
            where: { email: req.body.email }
        });
        return res.status(200).send(userRerutn);
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