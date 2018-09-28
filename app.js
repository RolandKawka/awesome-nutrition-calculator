const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');
require('./models/Product');
require('./models/User');
const schema = require('./schema');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI);

app.use('/', routes);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.listen(3000, () => console.log('App listening on port 3000!'));
