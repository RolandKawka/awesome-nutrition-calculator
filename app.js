const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');
require('./models/Product');
require('./models/User');
const seedDb = require('./seeds');
const schema = require('./schema');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI);


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/seedDb', seedDb);
app.post('/signin', (req, res) => signin.signinAuthentication(req, res, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.listen(3000, () => console.log('App listening on port 3000!'));
