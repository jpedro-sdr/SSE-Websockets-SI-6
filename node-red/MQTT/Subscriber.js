const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

client.on('connect', () => {
    console.log('Connected to broker');
    client.subscribe('sensores/voltagem', (err) => {
        if (!err) {
            console.log('Subscribed to sensores/voltagem')
        } else {
            console.error('Error subscribing to sensores/voltagem:', err)
        }
    })
})

client.on('message', (topic, message) => {
    console.log('Received message %s %s', topic, message.toString())
})
