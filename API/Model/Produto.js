const db = require('../../banco.js');

const Produto = {
  create: async function (nome, preco, descricao, imagem, id) {
    (await db).command("CREATE VERTEX Product SET name = :nome, price = :preco, description = :descricao, image = :imagem, id = :id", {
      params:
        [nome, preco, descricao, imagem, id],
      pageSize: 1000
    })
      .all()
      .then(results => {
        //console.log(results);
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
  getrecommendation: async function () {
    return (await db).command(`SELECT FROM Product WHERE id = 0 or id = 1 or id = 2 or id = 3`).all();
  }
};
module.exports = Produto;
