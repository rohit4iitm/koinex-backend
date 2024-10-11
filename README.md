
```markdown
# Koinx Backend

This is a Node.js application that provides APIs for fetching cryptocurrency data and calculating market statistics. The application uses MongoDB to store historical cryptocurrency data and periodically updates it using background jobs.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [/api/stats](#api-stats)
  - [/api/deviation](#api-deviation)
- [Background Job](#background-job)

## Technologies Used

- Node.js
- Express.js
- Mongoose
- MongoDB
- Axios
- Node-cron
- dotenv
- PM2 (for process management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/koinx-backend.git
   cd koinx-backend
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/koinx
   COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
   PORT=5000
   ```

4. Start the application:

   ```bash
   node src/index.js
   ```

## Usage

After starting the application, you can access the API at `http://localhost:5000/api`.

## API Endpoints

### /api/stats

Fetches the latest cryptocurrency data from CoinGecko.

**Query Parameters:**
- `coin`: The cryptocurrency for which to fetch data (e.g., `bitcoin`, `ethereum`).

**Example Request:**

```http
GET http://localhost:5000/api/stats?coin=bitcoin
```

**Response:**

```json
{
  "price": 45000,
  "marketCap": 850000000000,
  "24hChange": -2.5
}
```

### /api/deviation

Calculates the price deviation of a specified cryptocurrency based on historical data.

**Query Parameters:**
- `coin`: The cryptocurrency for which to calculate the deviation.

**Example Request:**

```http
GET http://localhost:5000/api/deviation?coin=bitcoin
```

**Response:**

```json
{
  "deviation": 1500.75
}
```

## Background Job

The application includes a background job that runs every 2 hours to fetch the latest cryptocurrency data from CoinGecko and stores it in MongoDB. This ensures that the API serves the most up-to-date information.


**Author:** Rohit Shinde  
**Roll No:** 21F3002241  
**IIT Madras BS Degree**
```

