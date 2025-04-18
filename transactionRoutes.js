const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/create', transactionController.createTransaction);
router.post('/edit/:id', transactionController.updateTransaction);
router.post('/delete/:id', transactionController.deleteTransaction);

module.exports = router;
