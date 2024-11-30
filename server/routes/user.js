const express = require('express');
const userRouter = express.Router();
const { verifyToken } = require('../middleware/JWTAction');
const UserController = require('../controllers/UserController');

userRouter.post('/signup', UserController.addUser);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/authentication', verifyToken, UserController.auth);

module.exports = userRouter;