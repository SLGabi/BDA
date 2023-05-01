const express = require('express');
const router = express.Router();
const db = require('../Model/Usuario');

// Rota POST para criar um novo usuário
router.post('/usuarios', async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;

  try {
    // Crie um novo nó no banco de dados para o usuário
    const user = await db.create(nome, email);

    // Retorne a resposta com o novo usuário criado
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao criar usuário');
  }
});

module.exports = router;