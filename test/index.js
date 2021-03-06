const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('../models').User;

chai.use(chaiHttp);


// ==> Test signup
describe('Teste singUp', () => {
    it('Deve criar um novo usuário', (done) => {
        const body = {
            "nome": "Teste1",
            "email": "teste1@teste.com",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('Deve informar que já existe um usuário com esse email', (done) => {
        const body = {
            "nome": "Teste2",
            "email": "teste1@teste.com",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o nome não foi informado', (done) => {
        const body = {
            "email": "teste3@teste.com",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o email não foi informado', (done) => {
        const body = {
            "nome": "Teste4",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que a senha não foi informada', (done) => {
        const body = {
            "nome": "Teste5",
            "email": "teste5@teste.com",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o DDD de um dos telefones não foi informado', (done) => {
        const body = {
            "nome": "Teste6",
            "email": "teste6@teste.com",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999"
            },
            {
                "numero": "88888888",
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o numero de um dos telefones não foi informado', (done) => {
        const body = {
            "nome": "Teste7",
            "email": "teste7@teste.com",
            "senha": "senha",
            "telefones": [{
                "numero": "9999999",
                "ddd": "99"
            },
            {
                "ddd": "88"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Teste singIn', () => {
    it('Deve logar', (done) => {
        const body = {
            "email": "teste1@teste.com",
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve informar que a senha está inválida', (done) => {
        const body = {
            "email": "teste1@teste.com",
            "senha": "senhaerrada"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Deve informar que o email está inválido', (done) => {
        const body = {
            "email": "testeerrado@teste.com",
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Deve informar que o email está vazio', (done) => {
        const body = {
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que a senha está vazia', (done) => {
        const body = {
            "email": "teste@teste.com"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
/* User.destroy({
    where: {
        email: "teste1@teste.com"
    }
}); */
describe('Teste buscar usuário', () => {
    it('Deve retornar o usuário', (done) => {
        User.findOne({
            attributes: ['id', 'token'],
            where: {
                email: "teste1@teste.com"
            }
        }).then(function (value) {
            console.log(value.dataValues.token);
            chai.request(server)
                .get(`/buscarUsuario/${value.dataValues.id}`)
                .set('token', value.dataValues.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    it('Deve informar que o usuário não está autorizado', (done) => {
        User.findOne({
            attributes: ['id', 'token'],
            where: {
                email: "teste1@teste.com"
            }
        }).then(function (value) {
            console.log(value.dataValues.token);
            chai.request(server)
                .get(`/buscarUsuario/${value.dataValues.id}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});