const db = require('../../banco');

const Usuario = {
  create: async function (nome, email) {
    (await db).command("CREATE VERTEX Customer SET name = :nome, email = :email", {
      params:
        [nome, email],
      pageSize: 1000
    })
      .all()
      .then(results => {
        console.log(results);
        return results;
      })
  }
};
module.exports = Usuario;
