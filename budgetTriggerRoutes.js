const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetTriggerController');

router.get('/', controller.getAllTriggers);

module.exports = router;
