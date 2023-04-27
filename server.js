const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Pegando os controllers
const usuariosController = require('./API/controllers/usuariosController');
const produtosController = require('./API/controllers/produtosController');

// Configuração do middleware para processar o body da requisição como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota principal que retorna o formulário HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/API/public/index.html');
});

// Inclua as rotas do controller de usuários
app.use(usuariosController);

// Inclua as rotas do controller de produtos
app.use(produtosController);

//Iniciando o servidor
app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`)
});
