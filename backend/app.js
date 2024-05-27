require('dotenv').config();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// express
const express = require('express');
const app = express();

// port
const PORT = process.env.PORT || 3000;

// router
const productsRouter = require('./routers/products-router');

// middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/products', productsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
