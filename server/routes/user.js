const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/UserController');

userRouter.get('/signup', UserController.showSignup);
userRouter.get('/login', UserController.showLogin);
userRouter.post('/signup', UserController.addUser);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);

module.exports = userRouter;