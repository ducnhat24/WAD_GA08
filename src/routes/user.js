const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/signup', UserController.showSignup);
router.get('/login', UserController.showLogin);
router.post('/signup', UserController.addUser);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

module.exports = router;