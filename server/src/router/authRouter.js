const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/checkToken');
const {
  validateLogin,
  validateRegistrationData,
} = require('../middlewares/validators');

authRouter.post(
  '/registration',
  validateRegistrationData,
  AuthController.registration
);
authRouter.post('/login', validateLogin, AuthController.login);
authRouter.post('/refresh',checkRefreshToken, AuthController.refresh);

module.exports = authRouter;
