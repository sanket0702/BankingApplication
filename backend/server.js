const express = require('express');
const axios = require('axios'); // Ensure axios is properly imported
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const transactionRoutes = require('./routes/transaction.js');
const userRoutes = require('./routes/user.js');
const { DatabaseConnection } = require('./database/connection.js');

dotenv.config();
DatabaseConnection();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);

// Health check route to confirm server is running
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Start pinging every 50 seconds
/*const pingServer = () => {
  axios.get(`${process.env.BASE_URL}/health`) // Assuming health endpoint
    .then(() => console.log('Server pinged successfully'))
    .catch((err) => console.error('Error pinging server:', err));
};*/

// Ping the server immediately on start
//pingServer();

// Ping every 50 seconds (50000 milliseconds)
//setInterval(pingServer, 50000);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
