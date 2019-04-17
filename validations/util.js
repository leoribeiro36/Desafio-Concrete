function checkEmpty(res, element, name) {
    if (element == undefined || element == "") {
        return res.status(400).send({
            mensagem: `O campo ${name} está vazio`
        })
    }
}

module.exports = {
    checkEmpty
}