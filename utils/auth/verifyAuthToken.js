const jwt = require('jsonwebtoken');
const httpStatus = require('./../http/httpStatusCodes');

const authHeader = 'x-access-token';

exports.authenticate = (requiredTokenType) => {
    return function(req, res, next) {
        const token = req.headers[authHeader];

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err || decoded.tokenType !== requiredTokenType) {
                res.status(httpStatus.UNAUTHORIZED).json('Authentication error');
            } else {
                next();
            }
        });
    }
};
