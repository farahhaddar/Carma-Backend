-- schema.sql
-- note the id should be serial but for
-- damo and not fetching the user id is set to int
-- Create the "users" table
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create the "cards" table
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    cardholderName VARCHAR(255) NOT NULL,
    cardNumber VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    expirationMonth INT NOT NULL,
    expirationYear INT NOT NULL,
    user_id INT REFERENCES users(id)
);

-- Insert a user into the "users" table
INSERT INTO users (id, username, email)
VALUES (1, 'Jane', 'Jane@gmail.com');