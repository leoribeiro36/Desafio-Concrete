# Desafio - Concrete

API restful de exemplificação básica de login e busca de contas

## Instalação

Este código foi desenvolvido utilizando o a versão do node 10.15.1 e para executar ele basta utilizar, na raiz do projeto, os comandos:

```bash
npm install
npm start
```

## Uso

Para criar um usuário é necessário realizar um POST passando as informações do usuário.

Exemplo:

```
rota - http://localhost:3000/signup
{
"nome": "João",
"email": "joao@teste.com",
"senha":"senhajoao",
"telefones": [{
	"numero": "33333333",
	"ddd": "33"
	}]
}
```

Para logar será necessário realizar um POST passando o email e senha do usuário já existente no banco.

Exemplo

```
rota - http://localhost:3000/signin
{
"email": "joao@teste.com",
"senha":"senhajoao"
}
```

Para buscar um usuário é necessário realizar um GET passando o id do usuário como parâmetro e o token desse usuário no header.

Exemplo

```
rota - http://localhost:3000/buscarUsuario/1
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```