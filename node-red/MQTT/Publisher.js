const mqtt = require('mqtt')
const client = mqtt.connect('mtqtt://broker.hivemq.com/mqtt:1883')

var interval = setInterval(function () {
    sendData()
}, 2000)

client.on('message', () => {
    console.log('message')
})

function sendData() {

    const randomVoltage = randomInt(0, 100);
    client.publish('/data', randomVoltage.toString())
    console.log('published', randomVoltage);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
