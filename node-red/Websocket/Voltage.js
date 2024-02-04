const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080, path: '/voltage' });

server.on('connection', (ws) => {

  const interval = setInterval(() => {
    const randomTemperature = Math.random() * 100; 
    const data = { Temperatura: randomTemperature };
    ws.send(JSON.stringify(data));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval); 
  });
});

console.log('WebSocket Server está ouvindo em ws://localhost:8080/voltage');
