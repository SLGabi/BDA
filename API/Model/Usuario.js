const db = require('../../banco.js');

const Usuario = {
  create: async function (nome, email) {
    (await db).command("CREATE VERTEX Customer SET name = :nome, email = :email", {
      params:
        [nome, email],
      pageSize: 1000
    })
      .all()
      .then(results => {
        //console.log(results);
        return results;
      })
  },
  getuser: async function (email) {
    return (await db).command("SELECT FROM Customer WHERE email = :email", { params : [email]}).one().then(results => {
      //console.log(results);
      return results;
    });
  },
  hasBuyEgde: async function (name, id) {
    return (await db).command("SELECT count(*) AS hasBought FROM (SELECT expand(out('HasBought')) FROM Customer WHERE name = :name) WHERE @class = 'Product' AND id = :id", { params : [name, id]}).one().then(results => {
      //console.log(results);
      return results;
    });
  },
  hasViewEgde: async function (name, id) {
    return (await db).command("SELECT count(*) AS visualized FROM (SELECT expand(out('Visualized')) FROM Customer WHERE name = :name) WHERE @class = 'Product' AND id = :id", { params : [name, id]}).one().then(results => {
      //console.log(results);
      return results;
    });
  },
};
module.exports = Usuario;
