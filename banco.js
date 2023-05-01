const OrientDBClient = require('orientjs').OrientDBClient;

async function conectaBanco(){
  let client = await OrientDBClient.connect({
  host: 'localhost',
  port: 2424
});
 
  console.log("Connected");
  //abri a sessão
  let session = await client.session({ name: "BDA", username: "root", password: "191715" });
  console.log("Session open");

  return session
}

const session = conectaBanco();

module.exports = session;