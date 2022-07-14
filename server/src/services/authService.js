const jwtService = require('./jwtService');
const { RefreshToken } = require('../models');

module.exports.createSession = async user => {
  console.log(user);
  const tokenPair = await jwtService.generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  await RefreshToken.create({ userId: user.id, token: tokenPair.refreshToken });

  return {
    user,
    tokenPair,
  };
};

module.exports.refreshSession = async refreshTokenInstance => {
  const user = await refreshTokenInstance.getUser();
  console.log(user);
  const tokenPair = await jwtService.generateTokenPair({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  await refreshTokenInstance.update({ token: tokenPair.refreshToken });
  return {
    user,
    tokenPair,
  };
};
