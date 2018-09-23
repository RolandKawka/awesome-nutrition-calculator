const mongoose = require('mongoose');

const seedProducts = () => {
    const events = [
        {
            name: 'White rice',
            fat: 0,
            carbs: 80,
            proteins: 3,
            calories: 360,
        },
        {
            name: 'Brown rice',
            fat: 0,
            carbs: 80,
            proteins: 3,
            calories: 360,
        },
        {
            name: 'Chicken breast',
            fat: 1,
            carbs: 0,
            proteins: 22,
            calories: 100,
        },
        {
            name: 'Olive oil',
            fat: 99,
            carbs: 0,
            proteins: 0,
            calories: 900,
        },
        {
            name: 'Durum pasta',
            fat: 0,
            carbs: 80,
            proteins: 3,
            calories: 360,
        },
    ];
    const Product = mongoose.model('Product');

    events.forEach((event) => {
        const newProduct = new Product(event);
        newProduct.save();
    });
};

module.exports = seedProducts;
