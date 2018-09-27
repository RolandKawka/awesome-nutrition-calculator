const mongoose = require('mongoose');
const httpStatus = require('./../utils/http/httpStatusCodes');
const mailer = require('../utils/mailer/mailer');
const tokenTypeDictionary = require('../utils/auth/tokenTypeDictionary');
const jwt = require('jsonwebtoken');

const subject = 'Verify email address - awesome nutrition calculator';

const handleRegister = async (req, res, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(httpStatus.BAD_REQUEST).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    const User = mongoose.model('User');
    const newUser = new User({
        hash,
        name,
        email,
        isVerified: false,
    });

    return newUser.save((err, user) => {
        if (err) {
            res.status(httpStatus.BAD_REQUEST).json(err);
        }
        const token = createEmailVerificationLink(user);
        sendVerificationEmail(user.email, subject, token)
            .then((result) => {
               res.status(result.statusCode).json(result.message);
            });
    });
};

const sendVerificationEmail = (recipient, subject, text) => {
    const options = {
        recipient: recipient,
        subject: subject,
        text: text,
    };

    return mailer.sendEmail(options);
};

const createEmailVerificationLink = (user) => {
    const jwtPayload = {
        email: user.email,
        tokenType: tokenTypeDictionary.JWT_EMAIL_VERIFICATION,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return 'localhost:3000/verify?token=' + token;
};

module.exports = {
    handleRegister,
};
