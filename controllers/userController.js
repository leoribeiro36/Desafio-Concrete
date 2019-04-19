const User = require('../models').User;
const jwt = require('jsonwebtoken');
const secret = require ('../secret');

async function checkToken(res, token) {
    try {
        await jwt.verify(token, secret.secret);
    } catch (error) {
        res.status(440).send({
            mensagem: `Sessão inválida`
        });
    }
}

const findUser = async (req, res) => {
    try {
        var user = await User.findOne({
            attributes: ['id', 'token', 'lastLogin', 'createdAt', 'updatedAt'],
            where: {id: req.params.id}
        });
        if (!user) {
            return res.status(400).send({
                mensagem: `Usuário não existe`
            });
        }

        await checkToken(res, user.token);

        if (user.token !==  req.headers.token) {
            return res.status(401).send({
                mensagem: `Não autorizado`
            });
        }
        return res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    findUser
};