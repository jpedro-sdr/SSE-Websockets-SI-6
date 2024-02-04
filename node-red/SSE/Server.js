const http = require("http");

const server = http.createServer(function (req, res) {
    res.writeHeader(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    });

    const interval = setInterval(function () {
        res.write("data: " + JSON.stringify({ value: randomInt(0, 10) }) + "\n\n");
    }, 2000);

    req.on('close', function () {
        clearInterval(interval);
        console.log('Cliente desconectado.');
    });
});

const port = 9090;
server.listen(port, () => {
    console.log(`SSE-Server started on port ${port}`);
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
