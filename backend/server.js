const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const {DatabaseConnection} = require('./database/connection.js');
const registerRoutes = require('./routes/index.js');
const { setupPing } = require('./services/pingService.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
DatabaseConnection();

// Register Routes
registerRoutes(app);

// Health Route
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Optional ping to keep server alive
// setupPing();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
