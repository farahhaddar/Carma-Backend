require('dotenv').config();
const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     port: process.env.DB_PORT,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
};

// Create a connection client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
     .then(() => {
          console.log('Connected to the database');
     })
     .catch((err) => {
          console.error('Error connecting to the database:', err);
     }).finally(() => {
          // closes the client when the application exits
          client.on('exit', () => {
               client.end();
          });
          console.log('disConnected');
     });

module.exports = client;
