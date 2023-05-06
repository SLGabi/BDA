const express = require('express');
const router = express.Router();
const db = require('../Model/Recommendation');
const dbProduct = require('../Model/Produto');

//Rota que pega as recomendações
router.get('/', async (req, res) => {

    try {
        const user = req.session.user.name;
        const email = req.session.user.email;
        const productsUser =  await db.getAllProductsCustomer(email);
        const allUser = await db.getAllUser(email);
        let similaridades = [];

        for (const user of allUser) {

            const productsNeig = await db.getAllProductsCustomer(user.email);
            const vetUser = [];
            const vetNeig = [];
            const result = productsUser.filter((elementA) => productsNeig.some((elementB) => elementA.id === elementB.id));
            
            for (const product of result) {
                const typeUser = await db.getInteractionType(email, product.id);
                const typeNeig = await db.getInteractionType(user.email, product.id);
                vetUser.push((+typeUser.type) + 1);
                vetNeig.push((+typeNeig.type) + 1);
            }

            if (result.length > 0) {
                let produtoEscalar = 0;
                for (let i = 0; i < vetUser.length; i++) {
                    produtoEscalar += vetUser[i] * vetNeig[i];
                }

                // Calcula as normas
                const normaA = Math.sqrt(vetUser.reduce((acc, val) => acc + val * val, 0));
                const normaB = Math.sqrt(vetNeig.reduce((acc, val) => acc + val * val, 0));

                // Calcula a similaridade de cosseno
                const similaridade = produtoEscalar / (normaA * normaB);
                similaridades.push({
                    'email': user.email,
                    'similarity': similaridade
                });
            } else {
                similaridades.push({
                    'email': user.email,
                    'similarity': -1
                });
            }
        }
        similaridades.sort((a, b) => b.similarity - a.similarity);
        const similarityNeig = similaridades.slice(0, 3).map(object => object.email);
        
        let candidates = [];

        for (neig of similarityNeig) {
            const productsNeig = await db.getAllProductsCustomer(neig);
            const candidatesAux = productsNeig.filter(a => !productsUser.find(b => b.id === a.id));

            let count = 3;
            for (candidate of candidatesAux) {
                let type = await db.getInteractionType(neig, candidate.id);
                type = (+type.type) + 1;
                
                if(candidates.find(elem => elem.id === candidate.id)) {
                    const index = candidates.findIndex(elem => elem.id === candidate.id);
                    candidates[index].score += count * type;

                } else {
                    candidates.push({
                        'id': candidate.id,
                        'score': count * type
                    });
                }
                count--;
            }
        }
        candidates.sort((a, b) => b.score - a.score);
        candidates = candidates.slice(0, 4);
        let products = []
        for (candidate of candidates) {
            const product = await dbProduct.getproduct(candidate.id);
            products.push(product);
        }
        res.render('home', { products: products, user: user });
        
    }
    catch (err) {
        res.redirect('/login');
    }
    
  });

module.exports = router;