const db = require('../../banco.js');

const Edge = {
  viewTrue: async function (email, id) {
    return (await db).command("CREATE EDGE Visualized FROM (SELECT * FROM Customer WHERE email = :email) TO (SELECT * FROM Product WHERE id = :id) SET visualized = true", {
        params:
          [email, id],
        pageSize: 1000
        }).one()
        .then(results => {
              //console.log(results);
              return results;
            });
  },
  buyTrue: async function (email, id) {
    return (await db).command("CREATE EDGE HasBought FROM (SELECT * FROM Customer WHERE email = :email) TO (SELECT * FROM Product WHERE id = :id) SET hasBought = true", {
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
