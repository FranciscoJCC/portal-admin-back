'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { PERMISSION_TABLE } = require('./../models/permission.model');
const { USER_PERMISSION_TABLE } = require('./../models/userPermission.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING(200)
      },
      password: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    }),

    await queryInterface.createTable(PERMISSION_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
      },
      type: {
        allowNull: false,
        type: Sequelize.DataTypes.ENUM(['module','action'])
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(USER_PERMISSION_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        }
      },
      permissionId: {
        field: 'permission_id',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PERMISSION_TABLE,
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable(USER_PERMISSION_TABLE), { transaction: t},
        queryInterface.dropTable(PERMISSION_TABLE), { transaction: t},
        queryInterface.dropTable(USER_TABLE), { transaction: t }
      ]);
    })
  }
};
