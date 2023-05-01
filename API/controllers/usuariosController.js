const express = require('express');
const router = express.Router();
const db = require('../Model/Usuario');

// Rota POST para criar um novo usuário
router.post('/register', async (req, res) => {
  const nome = req.body.name;
  const email = req.body.email;

  try {
    // Crie um novo nó no banco de dados para o usuário
    const user = await db.create(nome, email);

    
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

router.get('/register', async (req, res) => {
  res.render('register');
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  // autentica o usuário e guarda as informações na sessão
  db.getuser(email).then(user => {
    
    if (user) {
    req.session.user = {
      email: user.email,
      name: user.name,
    };

    res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  });
  
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;