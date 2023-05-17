const userRouter = require('express').Router();
const { signUp, login, logout } = require('../controllers/user.controller');

userRouter.post('/auth/signup', signUp);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', logout);

module.exports = userRouter;
