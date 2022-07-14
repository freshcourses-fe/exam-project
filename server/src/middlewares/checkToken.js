const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/jwtService');
const { RefreshToken } = require('../models');

module.exports.checkAuth = async (req, res, next) => {
  const [, accessToken] = req.headers.authorization.split(' ');
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.checkToken = async (req, res, next) => {
  try {
    const [, accessToken] = req.headers.authorization.split(' ');
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
    req.tokenData = await verifyAccessToken(accessToken);
    next();
  } catch (err) {
    next(err);
  }
};
module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;

    await verifyRefreshToken(refreshToken);

    req.refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    next();
  } catch (err) {
    next(err);
  }
};
