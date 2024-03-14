// Step 1: Set up your Node.js project

// Import required modules
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Import dotenv to load environment variables from .env file

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Step 2: Define functions to interact with the CoinMarketCap API

// Function to fetch latest cryptocurrency listings
async function getLatestListings() {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY, // Access API key from environment variable
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching latest listings:', error);
    throw error;
  }
}

// Step 3: Define routes for handling API requests

// Route to fetch and display latest cryptocurrency listings
app.get('/api/latest-listings', async (req, res) => {
  try {
    const data = await getLatestListings();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Step 6: Secure your API Key by storing it in environment variables

// Ensure API key is set
if (!process.env.API_KEY) {
  console.error('API_KEY environment variable is not set.');
  process.exit(1);
}

// Step 7: Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

