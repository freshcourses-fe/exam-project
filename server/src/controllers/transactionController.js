const { Transaction } = require('../models');

module.exports.getTransactions = async (req, res, next) => {
  try {
    const { tokenData } = req;

    const transactions = await Transaction.findAll({
      where: { userId: tokenData.userId },
    });

    res.send(transactions);
  } catch (error) {
    next(error);
  }
};
