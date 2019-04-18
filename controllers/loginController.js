const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const User = require('../models').User;
const Phone = require('../models').Phone;

function generateToken(req){
    var token = jwt.sign({
        data: req.body.email,
        senha: req.body.senha
      }, secret.secret, { expiresIn: 60 * 30 });

    return token;
}

const signUp = async  (req, res) => {
    try {
        var salt = bcrypt.genSaltSync(11)
        var hash = bcrypt.hashSync(req.body.senha, salt)
        var token = generateToken(req)
        const phones = req.body.telefones;

        var user = await User.create({
            name: req.body.nome,
            email: req.body.email,
            password: hash,
            lastLogin: new Date(),
            token: token
        })
        phones.forEach(element => {
            Phone.create({
                number: element.numero,
                ddd: element.ddd,
                userId: user.id
            },
            {
                attributes: [
                    'id',
                    'token',
                    'lastLogin',
                    'createdAt',
                    'updatedAt']
            })
        });
        return res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

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
    var token = generateToken(req)
    await User.update({
        token: token,
        lastLogin: new Date() },
        {where: {
            email: req.body.email
        }
    })
    var userRerutn = await User.findOne({
        attributes: ['id', 'token', 'lastLogin', 'createdAt', 'updatedAt'],
        where: {email: req.body.email}
    })
    return res.status(200).send(userRerutn)
}

module.exports = {
    signIn,
    signUp
}