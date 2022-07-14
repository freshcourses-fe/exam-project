const authService = require('../services/authService');
const { User } = require('../models');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser || !foundUser.comparePassword(password)) {
      return next(UserNotFoundError('User with this data is not found'));
    }

    const responseData = await authService.createSession(foundUser);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};
module.exports.registration = async (req, res, next) => {
  try {
    try {
      const user = await User.create(req.body);
      const responseData = await authService.createSession(user);

      res.send(responseData);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    const { refreshTokenInstance } = req;

    const responseData = await authService.refreshSession(refreshTokenInstance);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};
