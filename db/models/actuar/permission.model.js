const { Sequelize, Model, DataTypes } = require('sequelize');
const { MODULE_ACTUAR_TABLE } = require('./modules.model');

const PERMISSION_ACTUAR_TABLE = 'permissions';

const PermissionActuarSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    moduleId:{
        field: 'module_id',
        type: DataTypes.INTEGER,
        references: {
            model: MODULE_ACTUAR_TABLE,
            key: 'id'
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(80),
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING(250),
    },
    status: {
        allowNull: false,
        type: DataTypes.SMALLINT(1),
        defaultValue: 1
    },
}

class PermissionActuar extends Model {
    static associate(models){
        //Un permiso tiene un modulo
        this.belongsTo(models.ModuleActuar, {
            as: 'moduleActuar',
            foreignKey: 'moduleId'
        })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: PERMISSION_ACTUAR_TABLE,
            modelName: 'PermissionActuar',
            timestamps: false
        }
    }
}

module.exports = {
    PERMISSION_ACTUAR_TABLE,
    PermissionActuarSchema,
    PermissionActuar,
}