const Bacon = require("baconjs");

function getRandomProductId() {
    return Math.floor(Math.random() * 100) + 1;
}

const stopTimer = Bacon.later(15000, true);

// Accumulator for prices and counter
const accumulator = { prices: [], count: 0 };

Bacon.interval(10000)
    .map(() => getRandomProductId())
    .flatMapLatest(productId => {
        return Bacon.fromPromise(
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(response => response.json())
        ).onError(error => console.error(`Error fetching product ${productId}:`, error));
    })
    .scan(accumulator, (acc, product) => {
        // Add the price of the new product to the accumulator
        acc.prices.push(product.price);
        
        // Keep only the last 3 prices
        if (acc.prices.length > 3) {
            acc.prices.shift();
        }
        
        // Increment the counter
        acc.count++;
        
        // Calculate the average price
        const averagePrice = acc.prices.reduce((sum, price) => sum + price, 0) / acc.prices.length;
        
        // Log the product details and average price
        console.log(product);
        console.log(`Média de preço dos últimos 3 produtos: ${averagePrice.toFixed(2)}`);
        
        return acc;
    })
    .takeUntil(stopTimer)
    .onValue(function () {
        // Do nothing in the onValue handler
    });
