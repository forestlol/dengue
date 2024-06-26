const aedes = require('aedes')({
    persistence: require('aedes-persistence-redis')({
      host: process.env.REDIS_HOST || '127.0.0.1'
    }),
    mq: require('mqemitter-redis')({
      host: process.env.REDIS_HOST || '127.0.0.1'
    })
  });
  const server = require('net').createServer(aedes.handle);
  const PORT = process.env.PORT || 1883;
  
  server.listen(PORT, function () {
    console.log('Aedes broker started and listening on port ', PORT);
  });
  
  aedes.on('client', function (client) {
    console.log('Client Connected:', client.id);
  });
  
  aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected:', client.id);
  });
  
  aedes.on('publish', function (packet, client) {
    if (client) {
      console.log('Message from client:', client.id);
    }
  });
  