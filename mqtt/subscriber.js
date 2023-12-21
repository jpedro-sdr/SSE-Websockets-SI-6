const mqtt = require('mqtt')

const client = mqtt.connect('wss://broker.hivemq.com/mqtt')

// Assinando o tópico 'sensores/voltagem' ao se conectar
client.on('connect', () => {
    client.subscribe('sensores/voltagem', (err) => {
        if (!err) {
            console.log('Subscribed to sensores/voltagem')
        } else {
            console.error('Error subscribing to sensores/voltagem:', err)
        }
    })
})

// Recebendo mensagens no tópico 'sensores/voltagem'
client.on('message', (topic, message) => {
    console.log('Received message %s %s', topic, message.toString())
})
