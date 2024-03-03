// api/callback.js

// Import necessary libraries (e.g., axios for making HTTP requests)
const axios = require('axios');

// Your Roblox app credentials
const CLIENT_ID = process.env.ROBLOX_CLIENT_ID;
const CLIENT_SECRET = process.env.ROBLOX_CLIENT_SECRET;

// Your Vercel serverless function
module.exports = async (req, res) => {
  try {
    const { code } = req.query; // Extract the authorization code

    // Make a POST request to Roblox's token endpoint
    const response = await axios.post('https://auth.roblox.com/v2/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
    });

    const accessToken = response.data.access_token;

    // Store the access token securely (e.g., in a session or database)
    // Implement your own logic here

    // Respond with a success message
    res.status(200).json({ message: 'Authorization successful' });
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
