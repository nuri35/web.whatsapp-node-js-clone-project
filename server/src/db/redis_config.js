
const redis = require('redis');
const client = redis.createClient({
    port: 6379, 
    host:process.env.REDIS_HOST, 
});
client.connect()
client.select(process.env.DB_INFO); 

client.on('connect', function() {
    console.log('Redis Database connected'+'\n');
});



client.on('ready', function() {
    console.log('Redis client is ready');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});



// module.exports.set = (key, value) => {
//     client.set(key, value, redis.print);
//     return 'done';
//   }
  
 module.exports = client;