require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cardRoute = require('./routes/Card');


// middleware 
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());// to get req.body
app.use('/cards', cardRoute);


app.listen(process.env.SERVER_PORT, () => {
     console.log(`Server is now listening at port ${process.env.SERVER_PORT}`);
});





