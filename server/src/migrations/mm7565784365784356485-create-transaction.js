'use strict';
const {
  TRANSACTION_TYPES: { INCOME, EXPENSE },
} = require('../constants');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Banks',
          key: 'cardNumber',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      amount: {
        type: Sequelize.NUMERIC,
        allowNull: false,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(INCOME, EXPENSE),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  },
};
