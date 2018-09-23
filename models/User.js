const mongoose = require('mongoose');

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
