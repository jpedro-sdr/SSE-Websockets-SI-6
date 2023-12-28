// 2. Modifique o exercício 1. de modo que o código passe a consumir o seguinte endpoint
// https://httpbin.org/status/[status_code], onde status_code deve variar entre 401 a 410. Note que as
// requisições irão gerar erros. Deste modo, modifique seu código para que cada requisição seja re-tentada
// ao menos 3 vezes. O objetivo é simular o consumo de endpoints que estão temporariamente fora do ar
// ou não foram encontrados, que estão apresentando problemas de autorização/autenticação (devido a
// algum erro no servidor), ou que estão provendo valores num formato não esperado/solicitado (gerando
// assim problemas de parsing). Para esses casos de erro, deverá ser emitido: “Ocorreu um erro ao
// requisitar a URL [URL consultada] (número de tentativas: 3)” através do console.error().
// OBS: O mesmo delay (lógica) entre requisições do exercício 1. deve ser mantido na lógica desse exercício
// também.

Bacon = require("baconjs");

function requestWithRetry(url, maxTentativas) {
    let tentativas = 0;

    function makeRequest() {
        return Bacon.fromPromise(
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição (status ${response.status})`);
                    }
                    return response.json();
                })
                .catch(error => {
                    retries++;
                    console.error(`Ocorreu um erro ao requisitar a URL ${url} (número de tentativas: ${tentativas})`);
                    if (tentativas < maxTentativas) {
                        return makeRequest();
                    } 
                })
        );
    }

    return makeRequest();
}

Bacon.sequentially(3000, [401, 402, 403, 404, 405, 406, 407, 408, 409, 410])
    .flatMapLatest(statusCode =>
        requestWithRetry(`https://httpbin.org/status/${statusCode}`, 3)
    )
    .onValue(function (val) {
        console.log(val);
    });

// TEMPO GASTO : 19 minutos