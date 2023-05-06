const db = require('../../banco.js');

const Edge = {
  view: async function (email, id) {
    return (await db).command("CREATE EDGE Interaction FROM (SELECT * FROM Customer WHERE email = :email) TO (SELECT * FROM Product WHERE id = :id) SET type = false", {
        params:
          [email, id],
        pageSize: 1000
        }).one()
        .then(results => {
              //console.log(results);
              return results;
            });
  },
  buy: async function (email, id) {
    return (await db).command("update EDGE Interaction set type = true where out.email=:email and in.id=:id", {
        params:
          [email, id],
        pageSize: 1000
        }).one()
        .then(results => {
              //console.log(results);
              return results;
            });
  },
};
module.exports = Edge;
