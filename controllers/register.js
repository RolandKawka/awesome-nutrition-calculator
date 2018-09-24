const mongoose = require('mongoose');
const httpStatus = require('./../utils/http/httpStatusCodes');

const handleRegister = (req, res, bcrypt) => {
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
        res.status(httpStatus.OK).json(user);
    });
};

module.exports = {
    handleRegister,
};
