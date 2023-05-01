const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Pegando os controllers
const usuariosController = require('./API/controllers/usuariosController');
const produtosController = require('./API/controllers/produtosController');

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');


// Configuração do middleware para processar o body da requisição como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota principal que retorna o formulário HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

// Inclua as rotas do controller de usuários
app.use(usuariosController);

// Inclua as rotas do controller de produtos
app.use(produtosController);

//Iniciando o servidor
app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`)
});
