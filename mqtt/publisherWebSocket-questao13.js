const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const { Server: WebSocketServer } = require('ws');
const SSE = require('express-sse');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const sse = new SSE();

const client = mqtt.connect('mqtt://localhost');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mqtt_websocket-questao13.html');
});

app.get('/stream', sse.init);

client.on('connect', function () {
    console.log('Conectado ao broker MQTT');
});

client.on('message', function (topic, message) {
    sse.send(message.toString(), topic);
});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const jsonData = JSON.parse(data);

        if (jsonData.action === 'subscribe') {
            client.subscribe(jsonData.topic);
        } else if (jsonData.action === 'unsubscribe') {
            client.unsubscribe(jsonData.topic);
        }
    });
});

app.post('/subscribe/:topic', (req, res) => {
    const topic = req.params.topic;
    client.subscribe(topic);
    res.send('Inscrito no tópico ' + topic);
});

app.post('/unsubscribe/:topic', (req, res) => {
    const topic = req.params.topic;
    client.unsubscribe(topic);
    res.send('Desinscrito do tópico ' + topic);
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
