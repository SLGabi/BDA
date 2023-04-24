const app = require('./config/express')();
const port = app.get('port');

//conectando ao orientDB
const OrientDBClient = require('orientjs').OrientDBClient;

async function DoSomething(){
  let client = await OrientDBClient.connect({
  host: 'localhost',
  port: 2424
});

  console.log("Connected");
  //abri a sessão
  let session = await client.session({ name: "BDA", username: "root", password: "191715" });
  // use the session
  console.log("Session open");
  // close the session
  await session.close();
  console.log("Session Closed");

  await client.close();

  console.log("Client Closed");
}

DoSomething();
// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});
