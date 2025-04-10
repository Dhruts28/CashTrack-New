const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/create', controller.createCategory);
router.post('/edit/:id', controller.updateCategory);
router.post('/delete/:id', controller.deleteCategory);

module.exports = router;
