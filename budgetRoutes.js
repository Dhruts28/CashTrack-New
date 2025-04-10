const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');

router.get('/', controller.getAllBudgets);
router.get('/:id', controller.getBudgetById);
router.post('/create', controller.createBudget);
router.post('/edit/:id', controller.updateBudget);
router.post('/delete/:id', controller.deleteBudget);

module.exports = router;
