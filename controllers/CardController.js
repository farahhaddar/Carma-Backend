const CardModel = require('../models/CardModel');
const { validationResult } = require('express-validator');

module.exports = {
     
     // Custom public validation function to check Luhn algorithm validity
     isLuhnValid: function (value) {
          // Remove non-digit characters
          value = value.replace(/\D/g, '');

          // Luhn algorithm
          let sum = 0;
          let alternate = false;
          for (let i = value.length - 1; i >= 0; i--) {
               let digit = parseInt(value.charAt(i), 10);
               if (alternate) {
                    digit *= 2;
                    if (digit > 9) {
                         digit -= 9;
                    }
               }
               sum += digit;
               alternate = !alternate;
          }
          return sum % 10 === 0;
     },

     // Insert a new card
     async insertCard(req, res) {

          const { cardholderName, cardNumber, cvv, expirationMonth, expirationYear, userId } = req.body;
          
          // validation 
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          
          try {
               const result = await CardModel.insertCard(req.body);
               if (result !== null) {
                    // Data was successfully inserted
                    return  res.status(200).json({ message: 'Card added successfully ', data: result });
               } else {
                    // Insertion failed, handle the error and send a corresponding response
                    return res.status(500).json({ error: 'Card insertion failed ' });
               }
          } catch (error) {
               return res.status(500).json({ error: 'Internal server error ' });
          }


     }

};

