const db = require('../../banco.js');

const Query = {
    getAllProductsCustomer: async function (email) {
        return (await db).command("SELECT expand(out('Interaction')) AS product FROM Customer WHERE email = :email", {
            params: {
              email: email
            },
            pageSize: 1000
          }).all();
      },
      getAllUser: async function (email) {
        return (await db).command("SELECT FROM Customer where email !=:email", {
            params: {
              email: email
            },
            pageSize: 1000
          }).all();
      },
      getInteractionType: async function(email, id) {
        return (await db).command("SELECT type FROM Interaction where out.email =:email and in.id=:id", {
          params: {
            email: email,
            id: id,
          },
          pageSize: 1000
        }).one();
      },
};

module.exports = Query;
