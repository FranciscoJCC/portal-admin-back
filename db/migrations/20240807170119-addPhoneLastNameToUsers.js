'use strict';
const { USER_TABLE } = require('../models/panelAdmin/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'last_name', {
      field: 'last_name',
      allowNull: false,
      type: Sequelize.DataTypes.STRING(100),
      after: 'name'
    })

    await queryInterface.addColumn(USER_TABLE, 'phone', {
      field: 'phone',
      allowNull: true,
      type: Sequelize.DataTypes.STRING(15),
      after: 'last_name'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
