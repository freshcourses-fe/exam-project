'use strict';
const { Model } = require('sequelize');
const {
  TRANSACTION_TYPES: { INCOME, EXPENSE },
} = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({User, Bank}) {
      // define association here
      Transaction.belongsTo(User, {foreignKey: 'userId'});
      Transaction.belongsTo(Bank, {foreignKey: 'cardNumber'});
    }
  }
  Transaction.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(INCOME, EXPENSE),
      },
      amount: {
        allowNull: false,
        type: DataTypes.NUMERIC,
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
