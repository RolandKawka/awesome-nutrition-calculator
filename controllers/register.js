const mongoose = require('mongoose');

const handleRegister = (req, res, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    const User = mongoose.model('User');
    const newUser = new User({
        hash,
        name,
        email,
    });

    return newUser.save((err, user) => {
        if (err) {
            res.status(400).json('unable to register');
        }
        res.status(200).json(user);
    });
};

module.exports = {
    handleRegister,
};
