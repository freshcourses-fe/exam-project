const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ACCESS_TOKEN_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
} = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const createToken = async (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, { expiresIn });

const verifyToken = async (token, secret) => jwtVerify(token, secret);

module.exports.generateTokenPair = async payload => {
  return {
    accessToken: await createToken(payload, {
      secret: ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_TIME,
    }),
    refreshToken: await createToken(payload, {
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_TIME,
    }),
  };
};

module.exports.verifyAccessToken = async token =>
  verifyToken(token, ACCESS_TOKEN_SECRET);

module.exports.verifyRefreshToken = async token =>
  verifyToken(token, REFRESH_TOKEN_SECRET);
