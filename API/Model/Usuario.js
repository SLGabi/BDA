const db = require('../../banco');
const Usuario = {
    create: async function (nome, email) {
      const user = (await db).command("CREATE VERTEX Customer SET name = :name, email = :email", {
        params: 
        { 
          name: nome,
          email: email
        }
      }).one();
      console.log(user.name);
  
      return user;
    }
  };

  module.exports = Usuario;
  