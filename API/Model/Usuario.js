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
  hasInteraction: async function (email, id) {
    return (await db).command("SELECT count(*) AS type FROM (SELECT expand(out('Interaction')) FROM Customer WHERE email = :email) WHERE @class = 'Product' AND id = :id", { params : [email, id]}).one().then(results => {
      //console.log(results);
      return results;
    });
  },
};
module.exports = Usuario;
