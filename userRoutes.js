const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.post('/edit/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
