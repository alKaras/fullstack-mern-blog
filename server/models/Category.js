const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('categories', CategoryScheme);

module.exports = Category;