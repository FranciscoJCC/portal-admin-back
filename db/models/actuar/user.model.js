const { Sequelize, Model, DataTypes } = require("sequelize");

const USER_ACTUAR_TABLE = 'users';

const UserActuarSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING(150),
    },
    lastName: {
        field: 'last_name',
        allowNull: true,
        type: DataTypes.STRING(100),
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING(15),
    },
    email: {
        allowNull: true,
        type: DataTypes.STRING(150),
        unique: true,
    },
    username: {
        allowNull: true,
        type: DataTypes.STRING(80),
    },
    password: {
        allowNull: true,
        type: DataTypes.STRING(30)
    },
    createDate: {
        field: 'create_date',
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    active: {
        allowNull: true,
        type: DataTypes.SMALLINT(6),
        default: 1
    },
    updatestatus: {
        allowNull: true,
        type: DataTypes.SMALLINT(6),
        default: 0
    },
    slack: {
        allowNull: true,
        type: DataTypes.STRING(70)
    }
}

class UserActuar extends Model {
    static associate(models){}

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_ACTUAR_TABLE,
            modelName: 'UserActuar',
            timestamps: false,
            hooks: {
                
            },
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                allProperties: { attributes: {}}
            }
        }
    }
}

module.exports = {
    USER_ACTUAR_TABLE,
    UserActuarSchema,
    UserActuar
}