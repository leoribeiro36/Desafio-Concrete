const util = require('./util')

async function checkEmail(res, email) {
    
}

const signIn = (req, res, next) => {
    util.checkEmpty(res, req.body.email, 'email')
    util.checkEmpty(res, req.body.senha, 'senha')
    next()
}

module.exports = {
    signIn
}