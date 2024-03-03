// Dependencies
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');
const cron = require('node-cron');
const express = require('express');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

const getCryptoPrice = async (coin = 'BTC') => {
    try {
        const { data } = await axios.get(`https://api.coincap.io/v2/assets/${coin.toLowerCase()}`);
        return data.data.priceUsd;
    } catch (error) {
        console.error('Error fetching crypto price:', error);
        return null;
    }
};

const generateCryptoJoke = () => {
    const jokes = [
        "Why did the Bitcoin break up with the Ethereum? Because it had too many issues!",
        "I told my wife I was investing in crypto. She said, 'It's like throwing money in the river.' I guess that's why they call it 'streaming income.'",
        "Why don't crypto investors like to spill their coffee? Because they hate losing their mugs!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
};

// Scheduled task to fetch BTC price every hour
cron.schedule('0 * * * *', async () => {
    const price = await getCryptoPrice('BTC');
    console.log(`Current BTC Price: $${price}`);
    io.emit('priceUpdate', price);
});

app.get('/joke', (req, res) => {
    res.send(generateCryptoJoke());
});

server.listen(3000, () => {
    console.log('CryptoDegenBot server running on port 3000');
});

module.exports = {
    getCryptoPrice,
    generateCryptoJoke
};
