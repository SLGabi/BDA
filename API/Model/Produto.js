const db = require('../../bancoip');

const Produto = {
  create: async function (nome, preco, descricao, imagem, id) {
    (await db).command("CREATE VERTEX Product SET name = :nome, price = :preco, description = :descricao, image = :imagem, id = :id", {
      params:
        [nome, preco, descricao, imagem, id],
      pageSize: 1000
    })
      .all()
      .then(results => {
        console.log(results);
        return results;
      });
  },
  getall: async function () {
    return (await db).command(`SELECT FROM Product`).all().then(results => {
      //console.log(results);
      return results;
    });
  },
  getproduct: async function (id) {
    return (await db).command("SELECT FROM Product WHERE id = :id", { params : [id]}).one().then(results => {
      //console.log(results);
      return results;
    });
  },
};
module.exports = Produto;
