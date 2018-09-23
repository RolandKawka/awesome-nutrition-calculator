const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        unique: true,
        required: 'You must supply a name!',
    },
    proteins: {
        type: Number,
        required: 'You must supply proteins!',
        min: 0,
        max: 100,
    },
    carbs: {
        type: Number,
        required: 'You must supply carbs!',
        min: 0,
        max: 100,
    },
    fat: {
        type: Number,
        required: 'You must supply fat!',
        min: 0,
        max: 100,
    },
    calories: {
        type: Number,
        required: 'You must supply calories!',
        min: 0,
        max: 1000,
    },
});

module.exports = mongoose.model('Product', productSchema);
