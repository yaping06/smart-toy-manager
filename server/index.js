// server/index.js
const express = require('express');
const cors = require('cors'); // Import CORS to allow the frontend to communicate with this backend
require('dotenv').config();
const toyRoutes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001; // Define the port number where the server will run

// Middleware
// cors(): Allows React app (port 5170) talk to this server
app.use(cors());
// Automatically parses incoming requests with JSON payloads
app.use(express.json());

app.use('/api', toyRoutes);

// Server Listener: Starts the server
app.listen(PORT, () => {
    console.log(`✅ Server is live at http://localhost:${PORT}`);
  });