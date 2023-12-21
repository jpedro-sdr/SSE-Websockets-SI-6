const mqtt = require('mqtt');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
    const interval = setInterval(() => {
        const randomVoltage = randomInt(0, 100);
        ws.send(JSON.stringify({ topic: 'sensores/voltagem', message: randomVoltage }));
    }, 2000);

    ws.on('close', () => {
        clearInterval(interval);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
