const mongoose = require('mongoose');

const seedUsers = () => {
    const events = [
        {
            name: 'Nice guy',
            hash: 'abcde',
            email: 'niceguy@gmail.com',
        },
    ];
    const User = mongoose.model('User');

    events.forEach((event) => {
        const newUser = new User(event);
        newUser.save();
    });
};

module.exports = seedUsers;
