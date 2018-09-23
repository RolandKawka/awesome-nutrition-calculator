const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('./models/Product');
const seedDb = require('./seeds');
const schema = require('./schema');

const app = express();

app.use(cors());
app.use(morgan('combined'));

mongoose.connect(process.env.DB_URI);


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/seedDb', seedDb);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(3000, () => console.log('App listening on port 3000!'));
