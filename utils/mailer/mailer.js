const sgMail = require('@sendgrid/mail');
const httpStatus = require('./../http/httpStatusCodes');

function sendEmail(options) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: options.recipient,
        from: process.env.SENGRID_EMAIL_FROM,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };

    const response = {};
    sgMail
        .send(msg)
        .then(() => {
            response.statusCode = httpStatus.OK;
            response.message ='Email message has been sent successfully';
        })
        .catch((error) => {
            response.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            response.message ='Error while sending email message';
        });

    return response;
}

module.exports = sendEmail;
