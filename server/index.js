// server/index.js
const express = require('express');
const cors = require('cors'); // Import CORS to allow the frontend to communicate with this backend
const app = express();
const PORT = 3000; // Define the port number where the server will run

// Middleware
// cors(): Allows React app (port 5170) talk to this server
app.use(cors());
// Automatically parses incoming requests with JSON payloads
app.use(express.json());

// Mock Data: temporary data replacing a real database
const mockToys = [
  { id: 1, name: "Lego Train", brand: "Lego", min_age: 24, status: "Active" },
  { id: 2, name: "Peppa Pig Plush", brand: "Unknown", min_age: 12, status: "Storage" },
  { id: 3, name: "Magnetic Tiles", brand: "Magna-Tiles", min_age: 36, status: "Wishlist" }
];

// Routes(Endpoints): Defining how the server respinds to specific URLs
// Root Endpoint: Used for testing if the server is alive
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API Endpoint: Delivers the toy data
app.get('/api/toys', (req, res) => {
  console.log("Frontend is requesting toys...");
  res.json(mockToys); 
});

// Server Listener: Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});