const User = require('../models/user')
const Phone = require('../models/phone')

create = async (req, res) => {
    try {
        console.log(res)
        const User = await user.findOrCreate({
            name: req.body.nome,
            email: req.body.email,
            password: req.body.senha
        })
        const phones = req.body.telefones
        /* phones.forEach(element => {
            Phone.findOrCreate({
                number: element.numero,
                ddd: element.ddd,
                userId: user.id
            })
        }); */
        return res.status(200)
    } catch (error) {
        res.status(400)
    }
}

module.exports = {
    create
}