const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('./models/Product');

const app = express();

app.use(cors());
app.use(morgan('combined'));

mongoose.connect(process.env.DB_URI);

// const Product = mongoose.model('Product');
// const newProduct = new Product({
//     name: 'rice',
//     fat: 1,
//     carbs: 1,
//     proteins: 1,
//     calories: 1,
// });

// newProduct.save();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('App listening on port 3000!'));
