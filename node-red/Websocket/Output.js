const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080, path: '/data' });

server.on('connection', (ws) => {

  ws.on('message', (data) => {
    console.log(`Received message from WebSocket: ${data}`);
  });
  
});

console.log('WebSocket Server está ouvindo em ws://localhost:8080/voltage');
