const Category = require('../models/Category');

const createCategory = async (req, res) => {
    try {
        const doc = new Category({
            name: req.body.name,
        });

        const category = await doc.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Не вдалось створити категорію" });
    }
}

const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Помилка отримання категорій" })
    }
}

module.exports = {
    createCategory,
    fetchCategories
}