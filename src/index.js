// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchCryptoData = require('./jobs/fetchCryptoData');
const statsRouter = require('./routes/stats');
const deviationRouter = require('./routes/deviation');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Background job to fetch data every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

app.use('/api', statsRouter);
app.use('/api', deviationRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
