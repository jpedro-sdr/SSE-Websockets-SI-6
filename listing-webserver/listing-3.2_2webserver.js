// Exercicio 2
const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const temperatureUnit = query.unit || 'C'; 

  if (req.url === '/temperature') {
    const temperature = 40; 

    if (query.format && query.format.toLowerCase() === 'xml') {
      res.writeHead(200, { 'Content-Type': 'application/xml' });
      const xmlResponse = `<temperature><value>${temperature}</value><unit>${temperatureUnit}</unit></temperature>`;
      res.end(xmlResponse);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const jsonResponse = { temperature, unit: temperatureUnit };
      res.end(JSON.stringify(jsonResponse));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});