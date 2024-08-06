const { Sequelize, Model, DataTypes } = require("sequelize");

const PERMISSION_TABLE = 'permissions';

const PermissionSchema = {
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
}

class Permission extends Model {
    static associate(models){}

    static config(sequelize){
        return {
            sequelize,
            tableName: PERMISSION_TABLE,
            modelName: 'Permission',
            timestamps: true
        }
    }
}

module.exports = {
    PERMISSION_TABLE,
    PermissionSchema,
    Permission
}