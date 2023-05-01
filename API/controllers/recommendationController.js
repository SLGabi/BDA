const express = require('express');
const router = express.Router();
const db = require('../Model/Produto');

//Rota que pega as recomendações
router.get('/', (req, res) => {

    try {
        const user = req.session.user.name
        db.getrecommendation().then(products => {
            console.log(products);
            res.render('home', { products: products, user: user });
        });
    }
    catch (err) {
        res.redirect('/login');
    }
    
  });

module.exports = router;