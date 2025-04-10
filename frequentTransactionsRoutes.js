const express = require('express');
const router = express.Router();
const controller = require('../controllers/frequentTransactionController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/create', controller.create);
router.post('/edit/:id', controller.update);
router.post('/delete/:id', controller.delete);

module.exports = router;
