const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var interval = setInterval(function () {
    sendData()
}, 2000)

client.on('message', () => {
    console.log('message')
})

function sendData() {
    console.log('publishing')

    // Gerar dado aleatório
    const randomVoltage = randomInt(0, 100);

    // Publicar dado aleatório no tópico 'sensores/voltagem'
    client.publish('sensores/voltagem', randomVoltage.toString())

    console.log('published')
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
