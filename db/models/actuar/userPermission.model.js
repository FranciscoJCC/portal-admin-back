const { Sequelize, Model, DataTypes } = require('sequelize');
const { PERMISSION_ACTUAR_TABLE } = require('./permission.model');
const USER_PERMISSION_ACTUAR_TABLE = 'user_permissions';

const UserPermissionActuarSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId:{
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    permissionId:{
        field: 'permission_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PERMISSION_ACTUAR_TABLE,
            key: 'id'
        }
    },
    typeUser: {
        field: 'type_user',
        allowNull: false,
        type: DataTypes.ENUM("user", "operator")
    }
}

class UserPermissionActuar extends Model {
    static associate(models){
        
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_PERMISSION_ACTUAR_TABLE,
            modelName: 'UserPermissionActuar',
            timestamps: false
        }
    }
}

module.exports = {
    USER_PERMISSION_ACTUAR_TABLE,
    UserPermissionActuarSchema,
    UserPermissionActuar
}