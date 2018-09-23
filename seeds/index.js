const seedProducts = require('./product');

const seedDb = async (req, res) => {
    await seedProducts();

    res.send('Database seeded!');
};

module.exports = seedDb;
