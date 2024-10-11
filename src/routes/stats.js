const express = require('express');
const axios = require('axios');

const router = express.Router();

// Endpoint to get stats for a specific cryptocurrency
router.get('/stats', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Coin parameter is required' });
    }

    try {
        const response = await axios.get(`${process.env.COINGECKO_API_URL}`, {
            params: {
                ids: coin,
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true'
            }
        });

        const data = response.data[coin];

        if (!data) {
            return res.status(404).json({ message: 'No data found for the requested coin' });
        }

        // Return the latest cryptocurrency data from CoinGecko
        res.json({
            price: data.usd,
            marketCap: data.usd_market_cap,
            change24h: data.usd_24h_change
        });
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        res.status(500).json({ message: 'Error fetching data from CoinGecko' });
    }
});

module.exports = router;
