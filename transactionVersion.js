const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionVersionController');

router.get('/', controller.getAllVersions);
router.get('/:id', controller.getVersionById);

module.exports = router;
