const express = require('express');
const router = express.Router();
const CardController = require('../controllers/CardController');
const { check } = require('express-validator'); //check for datatype helps prevent sql injection
// middleware validation on route

router.post(
     '/',
     [
          check('cardholderName').isString().isLength({ max: 25 }),
          check('cardNumber').custom( value => CardController.isLuhnValid(value)).withMessage('Invalid credit card number Luhn'),
          check('cvv').isString().isLength({ min: 3, max: 3 }),
          check('expirationMonth').isNumeric().isLength({ min: 2 , max: 2}),
          check('expirationYear').isNumeric().isLength({ min: 2, max: 2}),
          check('userId').isNumeric(),
     ],
     CardController.insertCard
);
module.exports = router;
