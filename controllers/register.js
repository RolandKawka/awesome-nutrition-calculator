const mongoose = require('mongoose');
const emailValidator = require('./../utils/validator/emailVaildator');
const httpStatus = require('./../utils/http/httpStatusCodes');

const handleRegister = (req, res, bcrypt) => {
    const { email, name, password } = req.body;
    if (!emailValidator.isEmailValid(email) || !name || !password) {
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
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json('unable to register');
        }
        res.status(httpStatus.OK).json(user);
    });
};

module.exports = {
    handleRegister,
};
