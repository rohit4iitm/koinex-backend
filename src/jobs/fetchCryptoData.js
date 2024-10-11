// src/jobs/fetchCryptoData.js
const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const responses = await Promise.all(coins.map(coin =>
            axios.get(`${process.env.COINGECKO_API_URL}?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`)
        ));

        const cryptoData = responses.map((response, index) => {
            const coin = coins[index];
            return {
                coin,
                price: response.data[coin].usd,
                marketCap: response.data[coin].usd_market_cap,
                change_24h: response.data[coin].usd_24h_change
            };
        });

        await Crypto.insertMany(cryptoData);
        console.log('Crypto data fetched and saved successfully!');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

module.exports = fetchCryptoData;
