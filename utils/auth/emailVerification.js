const mailer = require('../mailer/mailer');
const tokenTypeDictionary = require('../auth/tokenTypeDictionary');
const jwt = require('jsonwebtoken');

const subject = 'Verify email address - awesome nutrition calculator';
const verifyEmailApiEndpoint = '/verify?token=';

exports.sendVerificationEmail = (user) => {

    const tokenLink = createEmailVerificationLink(user);

    const options = {
        recipient: user.email,
        subject: subject,
        text: tokenLink,
    };

    return mailer.sendEmail(options);
};

const createEmailVerificationLink = (user) => {
    const jwtPayload = {
        email: user.email,
        tokenType: tokenTypeDictionary.JWT_EMAIL_VERIFICATION,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return 'localhost:3000' + verifyEmailApiEndpoint + token;
};
