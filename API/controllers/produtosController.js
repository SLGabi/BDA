const express = require('express');
const router = express.Router();
const db = require('../Model/Produto');
const produtosJson = require('../data/produtos.json');

//Rota que pega todos produtos e renderiza o html 
router.get('/test', (req, res) => {
    db.getall().then(products => {
        console.log(products);
        res.render('allproducts', { products: products });
    });
  });


// Rota POST para criar um novo produto no banco a partir do JSON
router.get('/criarProdutos', async (req, res) => {
    try {
        for (const produto of produtosJson.produtos) {
            const { nome, preco, descricao, imagem } = produto;
            
                // Crie um novo nó no banco de dados para os produtos
                const product = await db.create(nome, preco, descricao, imagem);
                console.log(product);
                // Retorne a resposta com o novo produto criado
                
            }
        return res.status(201).send('Produtos criados com sucesso');
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Erro ao criar produto');
    }
});

module.exports = router;