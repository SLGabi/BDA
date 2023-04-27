const db = require('../../banco');

const Produto = {
  create: async function (nome, preco, descricao, imagem) {
    (await db).command("CREATE VERTEX Product SET name = :nome, price = :preco, description = :descricao, image = :imagem", {
      params:
        [nome, preco, descricao, imagem],
      pageSize: 1000
    })
      .all()
      .then(results => {
        console.log(results);
        return results;
      })
  }
};
module.exports = Produto;
