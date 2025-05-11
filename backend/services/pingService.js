const axios = require('axios');

const setupPing = () => {
  const pingServer = () => {
    axios.get(`${process.env.BASE_URL}/health`)
      .then(() => console.log('Pinged server successfully'))
      .catch((err) => console.error('Ping error:', err));
  };

  pingServer(); // immediate call
  setInterval(pingServer, 50000); // every 50s
};

module.exports = { setupPing };
