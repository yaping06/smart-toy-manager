require('dotenv').config(); // loads variables from .env file into process.env
const { Pool } = require('pg');

// Create a connection pool using the variables from your .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Helper function to run queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};