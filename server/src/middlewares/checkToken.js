const TokenError = require('../errors/TokenError');
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/jwtService');
const { RefreshToken } = require('../models');

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
