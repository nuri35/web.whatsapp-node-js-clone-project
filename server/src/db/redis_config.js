
const redis = require('redis');
const client = redis.createClient({
    port: 6379, 
    host:process.env.REDIS_HOST, 
});



async function createConnectedClient() {
    client.on('connect', () => {
      console.log("connected to redis");
    })
  
    client.on("error", (error) => {
      console.error(error);
    });
  
    client.on("end", () => {
      console.log("dis-connected from redis");
    });
  
    await client.connect()
    client.select(process.env.DB_INFO); 
    return client;
  }


async function clientClose() {
    client.quit()
  }

module.exports = { createConnectedClient, clientClose };

