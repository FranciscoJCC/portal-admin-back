const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(150),
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(200)
    },
    password: {
        allowNull: false, 
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        /* get(){
            const rawValue = this.getDataValue('createdAt');
            return moment(rawValue).format('DD-MM-YYYY HH:mm:ss');
        } */
    },
    updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}

class User extends Model {
    static associate(models){}

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true,
            hooks: {
                beforeCreate: async(user, options) => {
                    const password = await bcrypt.hash(user.password, 10);

                    user.password = password;
                },
                beforeUpdate: async(user, options) => {
                    const password = await bcrypt.hash(user.password, 10);

                    user.password = password;
                }
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
    USER_TABLE,
    UserSchema,
    User
}