const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const registerController = require('../controllers/register');
const signinController = require('../controllers/signin');
const authTokenChecker = require('../utils/auth/verifyAuthToken');

router.get('/', (req,res) => res.send("hello world"));
router.post('/register', registerController.handleRegister(bcrypt));
router.post('/signin', signinController.signinAuthentication(bcrypt));
router.get('/verify', authTokenChecker.validateEmailVerificationToken, registerController.verifyUser);

module.exports = router;
