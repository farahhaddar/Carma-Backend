# Payment Gateway Server

This project serves as the server for our full-stack application.

## Technologies and Dependencies Used

- `bcrypt` v5.1.1: Used for hashing and salting the CVV and credit card numbers to securely store them in the database.
- `cors` v2.8.5: Handles cross-origin communication between the back-end and front-end running on different ports.
- `dotenv` v16.3.1: Allows the use of environmental variables within the project for easy configuration changes (e.g., database URLs).
- `expressjs` v4.18.2: Used to build the Node.js server.
- `express-validator` v7.0.1: Validates data from front-end requests before saving it in the database.
- `pg-promise` v11.5.4: Connects and interacts with our PostgreSQL database.

## Getting Started with Node.js Server

In the server directory, follow these steps to get started:

1. Install the required dependencies:

- `npm install`


2. Copy the `.env.example` variables to the `.env` file. Ensure you fill in all the variables in the `.env` file with your credentials.

- `cp .env.example .env`


3. Run the SQL schema to set up the database. Use the following command and replace `your_username` and `your_database_name` with your actual database credentials:
`psql -U your_username -d your_database_name -a -f schema.sql`
OR
- Create a database with your desired name.
- Copy the database schema from `DB/schema.sql` to create the `users` and `cards` tables.
- Insert a user into the database with `id=1`. The code is also provided in the schema.

4. Start the project. Nodemon is set up in the start script to monitor and update the server with every change.
- `npm run dev` 


## File Structure

This project follows the MVC (Model-View-Controller) structure:

- `server.js` serves as the main entry point.
- `connection/connection.js` establishes a client connection to the PostgreSQL database using the credentials defined in the `.env` file.
- `controllers/CardController.js` handles all requests and responses between the front-end and the database.
- `models/CardModel.js` acts as a top-layer for database queries related to card data, primarily containing the `insertCard` function to save data sent from the front-end to the database.
- `routes/Card.js` defines all the possible routes for `/cards` requests.

## Luhn Algorithm

To validate data from the front-end, the `express-validator` library is used with a custom middleware to validate the type and length of received data. The library includes a function `isCreditCard()` that tests credit card numbers using regular expressions. Additionally, custom validation is implemented using the Luhn algorithm through a public function defined in `CardController.js`.

The Luhn algorithm iterates backward through the credit card number, doubling every other digit and adjusting values if necessary. If the sum of all the digits is divisible by 10, the credit card number is considered valid.

