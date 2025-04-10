const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.post('/create', accountController.createAccount);
router.post('/edit/:id', accountController.updateAccount);
router.post('/delete/:id', accountController.deleteAccount);

module.exports = router;
