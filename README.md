# CryptoDegenBot

A fun and interactive bot designed for cryptocurrency enthusiasts. Get real-time crypto prices, enjoy crypto-related jokes, and more.

## Features

- Real-time cryptocurrency prices
- Crypto-related jokes
- Simple API for integrating with other projects

## Getting Started

### Installation

npm install cryptodegenbot

### To get started with CryptoDegenBot, you can run the server:

npm start

### You can also use it in your project:

const { getCryptoPrice, generateCryptoJoke } = require('cryptodegenbot');

async function displayPrice() {
  const price = await getCryptoPrice('BTC');
  console.log(`BTC Price: $${price}`);
}

function showJoke() {
  console.log(generateCryptoJoke());
}

displayPrice();
showJoke();
