const seedProducts = require('./product');
const seedUsers = require('./users');

const seedDb = async (req, res) => {
    await seedProducts();
    await seedUsers();

    res.send('Database seeded!');
};

module.exports = seedDb;
