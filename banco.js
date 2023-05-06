const OrientDBClient = require('orientjs').OrientDBClient;

async function conectaBanco(){
  try {
    let client = await OrientDBClient.connect({
      host: 'localhost',
      port: 2424
    });

    console.log("Connected");
  
    let session = await client.session({ name: "DBALocal", username: "root", password: "191715" });
    console.log("Session open");
  
    return session;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
}

const session = conectaBanco();

module.exports = session;
