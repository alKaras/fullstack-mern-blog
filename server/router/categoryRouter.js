const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers');

router.get('/getCategories', CategoryController.fetchCategories);
router.post('/createCategory', CategoryController.createCategory);

module.exports = router;

