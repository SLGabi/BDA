const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');


//Pegando os controllers
const usuariosController = require('./API/controllers/usuariosController');
const produtosController = require('./API/controllers/produtosController');
const recommendationController = require('./API/controllers/recommendationController');
const nunjucks = require('nunjucks');

// Configuração para usar os templates
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

// Configuração para autenticação de usuário
app.use(session({
  secret: 'sua_chave_secreta_aqui',
  resave: false,
  saveUninitialized: true
}));


// Configuração do middleware para processar o body da requisição como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

// Inclua as rotas do controller de usuários
app.use(usuariosController);

// Inclua as rotas do controller de produtos
app.use(produtosController);

// Inclua as rotas do controller da recomendação
app.use(recommendationController);

//Iniciando o servidor
app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`)
});
