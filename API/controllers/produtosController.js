const express = require('express');
const router = express.Router();
const db = require('../Model/Produto');
const produtosJson = require('../data/produtos.json');

// Rota POST para criar um novo produto no banco a partir do JSON
router.get('/criarProdutos', (req, res) => {
    produtosJson.produtos.forEach((produto) => {
        try {
            nome = produto.nome;
            preco = produto.preco;
            descricao = produto.descricao;
            imagem = produto.imagem;

            // Crie um novo nó no banco de dados para os produtos
            const product = db.create(nome, preco, descricao, imagem);
    
            // Retorne a resposta com o novo produto criado
            return res.status(201).json(product);

        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar produto');
        }
    });  
});

module.exports = router;