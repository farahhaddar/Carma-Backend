const client = require('../connection/connection.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {


     // Function to insert a new card
     async insertCard(cardData) {

          const { cardholderName, cardNumber, cvv, expirationMonth, expirationYear, userId } = cardData;
          
          // Hash the card number and CVV before saving to the database
          const hashedCardNumber = await bcrypt.hash(cardNumber, saltRounds);
          const hashedCVV = await bcrypt.hash(cvv, saltRounds);

          const query = {
               // RETURNING * return the data inserted last in db
               text:
                    'INSERT INTO cards (cardholderName, cardNumber, cvv, expirationMonth, expirationYear, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cardholderName ',
               values: [cardholderName, hashedCardNumber, hashedCVV, expirationMonth, expirationYear, userId],
          };
          try {
               const result = await client.query(query);
               if (result.rows && result.rows.length > 0) {
                    const insertedData = result.rows[0]; // Access the first row
                    return insertedData;
               } else {
                    return null;
               }
          } catch (error) {
               return null;
          }
     },

};
