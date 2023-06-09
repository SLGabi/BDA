const express = require('express');
const router = express.Router();
const db = require('../Model/Produto');
const dbUser = require('../Model/Usuario');
const dbEdge = require('../Model/Edge');
const produtosJson = require('../data/produtos.json');

//Rota que pega todos produtos e renderiza o html 
router.get('/produtos', (req, res) => {
    try {
        const user = req.session.user.name
        db.getall().then(products => {
            //console.log(products);
            res.render('allproducts', { products: products, user: user });
        });
    }
    catch (err) {
        res.redirect('/login');
    }
  });

//Rota que pega um produto e renderiza o html 
router.get('/produto/:id', (req, res) => {
    const { id } = req.params;
    try {
        const userName = req.session.user.name;
        const email = req.session.user.email;

        dbUser.hasInteraction(email, id).then(result => {
            if (result.type === 0) {
                db.getproduct(id).then(product => {
                    dbEdge.view(email, id).then(edge => {
                        //console.log(edge);
                        res.render('product', { product: product, user: userName });
                    });
                });        
            } else {
                db.getproduct(id).then(product => {
                    res.render('product', { product: product, user: userName });
                });
            }
        })
    }
    catch (err) {
        res.redirect('/login');
    }
  });

//Rota para comprar um produto
router.get('/produto/comprar/:id', (req, res) => {
    const { id } = req.params;
    try {
        const userName = req.session.user.name;
        const email = req.session.user.email;
        
            //console.log(result)
            dbEdge.buy(email, id).then(edge => {
                //console.log(edge);
                res.redirect('/');
            });
    }
    catch (err) {
        res.redirect('/login');
    }
  });

// Rota POST para criar um novo produto no banco a partir do JSON
router.get('/criarProdutos', async (req, res) => {
    try {
        let id = 0;
        for (const produto of produtosJson.produtos) {
            const { nome, preco, descricao, imagem } = produto;
            
                // Crie um novo nó no banco de dados para os produtos
                //console.log(id)
                const product = await db.create(nome, preco, descricao, imagem, id);
                id += 1;
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