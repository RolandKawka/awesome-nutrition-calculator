const mongoose = require('mongoose');
const emailValidator = require('./../utils/validator/emailVaildator');

const userSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: 'You must supply a name!',
    },
    hash: {
        type: String,
        required: 'You must supply a password!',
    },
    email: {
        type: String,
        unique: true,
        required: 'You must supply an email!',
        validate: {
            validator: v => emailValidator.isEmailValid(v),
            message: 'Given email address is invalid',
        },
    },
    isVerified: {
        type: Boolean,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpiration: {
        type: Date,
    },
});

module.exports = mongoose.model('User', userSchema);
