const mongoose = require('mongoose');
const httpStatus = require('./../utils/http/httpStatusCodes');
const mailer = require('../utils/mailer/mailer');
const tokenTypeDictionary = require('../utils/auth/tokenTypeDictionary');
const jwt = require('jsonwebtoken');
require("../models/User");
const User = mongoose.model('User');

const subject = 'Verify email address - awesome nutrition calculator';

const handleRegister = (bcrypt) => async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(httpStatus.BAD_REQUEST).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    const newUser = new User({
        hash,
        name,
        email,
        isVerified: false,
    });

    try {
        const user = await newUser.save();
        res.status(httpStatus.OK).json(user);
        const token = createEmailVerificationLink(user);
        sendVerificationEmail(user.email, subject, token);
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).json(err);
    }
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
    return 'localhost:3000/verifyUser?token=' + token;
};

const verifyUser = async (req, res, next) => {
    const email = req.userEmail;
    try {
        const user = await User.findOne({email: email});
        if (user.isVerified === false) {
            User.update({email: email}, {$set: {isVerified: true}}, {}, function (err, user) {
                if (err) {
                    res.status(httpStatus.BAD_REQUEST).json(err);
                }
                res.status(httpStatus.OK).json(user);
            });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json('Verification link is invalid');
        }
    } catch (err) {
        res.status(httpStatus.NOT_FOUND).json('User with given email not found');
    }
};

module.exports = {
    handleRegister,
    verifyUser
};
