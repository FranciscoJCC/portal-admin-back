const { Sequelize, Model, DataTypes } = require('sequelize');

const MODULE_ACTUAR_TABLE = 'modules';

const ModuleActuarSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
        allowNull: true,
        type: DataTypes.TINYINT,
        default: 1
    },
}

class ModuleActuar extends Model {
    static associate(models){
        //Un modulo, puede tener varios permisos
        this.hasMany(models.PermissionActuar, {
            as: 'permissionsActuar',
            foreignKey: 'moduleId'
        })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: MODULE_ACTUAR_TABLE,
            modelName: 'ModuleActuar',
            timestamps: false,
        }
    }
}

module.exports = {
    MODULE_ACTUAR_TABLE,
    ModuleActuarSchema,
    ModuleActuar
}