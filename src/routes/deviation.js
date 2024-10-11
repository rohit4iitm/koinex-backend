// src/routes/deviation.js
const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

router.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    try {
        const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);
        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this coin' });
        }

        const prices = records.map(record => record.price);
        const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
        const deviation = Math.sqrt(prices.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / prices.length);

        res.json({ deviation });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating deviation' });
    }
});

module.exports = router;

