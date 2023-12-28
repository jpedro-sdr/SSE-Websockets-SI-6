Bacon = require("baconjs");

function getRandomProductId() {
    return Math.floor(Math.random() * 100) + 1;
}

const stopTimer = Bacon.later(15000, true);

Bacon.interval(10000)
    .map(() => getRandomProductId())
    .flatMapLatest(productId => {
        return Bacon.fromPromise(
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(response => response.json())
        ).onError(error => console.error(`Error fetching product ${productId}:`, error));
    })
    .takeUntil(stopTimer)
    .onValue(function (val) {
        console.log(val);
    });
