const { Sequelize, Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require('./user.model');
const { PERMISSION_TABLE } = require('./permission.model');

const USER_PERMISSION_TABLE = 'user_permissions';

const UserPermissionSchema = {
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
}

class UserPermission extends Model {
    static associate(models){}

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_PERMISSION_TABLE,
            modelName: 'UserPermission',
            timestamps: true
        }
    }
}

module.exports = {
    USER_PERMISSION_TABLE,
    UserPermissionSchema,
    UserPermission
}