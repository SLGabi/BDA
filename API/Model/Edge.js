const db = require('../../bancoip');

const Edge = {
  viewTrue: async function (email, id) {
    return (await db).command("CREATE EDGE Visualized FROM (SELECT FROM Customer WHERE email = :email) TO (SELECT FROM Product WHERE id = :id) SET visualized = :booleano", {
        params:
          [email, id, true],
        pageSize: 1000
        }).all()
        .then(results => {
              //console.log(results);
              return results;
            });
  },
};
module.exports = Edge;
