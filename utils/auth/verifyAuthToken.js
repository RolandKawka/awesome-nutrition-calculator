const jwt = require('jsonwebtoken');
const httpStatus = require('../http/httpStatusCodes');
const tokenTypeDictionary = require('./tokenTypeDictionary');

const authHeader = 'x-access-token';

exports.validateAuthToken = (requiredTokenType) =>
    (req, res, next) => {
        const token = req.headers[authHeader];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || decoded.tokenType !== requiredTokenType) {
                res.status(httpStatus.UNAUTHORIZED).json('Authentication error');
            } else {
                next();
            }
        });
    };

exports.validateEmailVerificationToken = (req, res, next) => {
    const token = req.query.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || decoded.tokenType !== tokenTypeDictionary.JWT_EMAIL_VERIFICATION) {
            res.status(httpStatus.UNAUTHORIZED).json('Verification link is not valid');
        } else {
            req.userEmail = decoded.email;
            next();
        }
    });
};
