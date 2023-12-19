const http = require('http');
const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/temperature') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        const sendSSE = (data) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        axios.get('https://devices.webofthings.io/pi/sensors/temperature')
            .then(response => {
                const temperatureData = response.data;

                sendSSE(temperatureData);
            })
            .catch(error => {
                console.error('Error:', error);

                sendSSE({ error: 'Failed to fetch temperature data' });
            });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(9090, () => {
    console.log('Servidor está ouvindo na porta 9090');
});
