const jwt = require('jsonwebtoken');

exports.verifyAuthToken = (token, requiredTokenType) => {

    if(!token) {
        return false;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email && decoded.tokenType) {
        return decoded.tokenType === requiredTokenType;
    }
    return false;
};




