const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');

router.post('/signup', UserController.addUser);
router.get('/', UserController.getUsers);

module.exports = router;

