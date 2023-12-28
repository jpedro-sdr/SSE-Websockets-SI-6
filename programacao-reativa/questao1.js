// 1. Utilizando o endpoint https://jsonplaceholder.typicode.com/users/[id], onde id varia de 1 a 10,
// escreva um código reativo para realizar um consumo de todos os dados de usuários (1-10) no formato
// JSON, sendo que cada requisição deve ser sucedido de um intervalo de tempo (delay) de 3 segundos
// (isto é, deve haver um intervalo de 3 segundos entre as requisições). Os dados dos 10 usuários devem
// ser mostrados na saída padrão do console (console.log).

Bacon = require("baconjs")

Bacon.sequentially(3000, [1,2,3,4,5,6,7,8,9,10])
    .flatMapLatest(id =>
        Bacon.fromPromise(
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => response.json())
        )
    ).onValue(function (val) {
        console.log(val);
    })

// TEMPO GASTO : 27 minutos 