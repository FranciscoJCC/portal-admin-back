const { Sequelize, Model, DataTypes } = require('sequelize');
const PATH_FILES = '\\\\192.168.1.229\\Desarrollos\\actuarsustentable\\'

const OPERATOR_ACTUAR_TABLE = 'operators';

const OperatorActuarSchema = {
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
    email: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING(150)
    },
    type: {
        allowNull: true,
        type: DataTypes.STRING(50)
    },
    createDate: {
        field: 'create_date',
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    username: {
        allowNull: true,
        type: DataTypes.STRING(50),
    },
    password: {
        allowNull: true,
        type: DataTypes.STRING(80)
    },
    active: {
        allowNull: true,
        type: DataTypes.SMALLINT(6),
        defaultValue: 1
    },
    status: {
        allowNull: true,
        type: DataTypes.SMALLINT(6),
        defaultValue: 1
    },
    empId: {
        field: 'emp_id',
        allowNull: true,
        type: DataTypes.INTEGER(11)
    },
    updateStatus:{
        allowNull: true,
        type: DataTypes.SMALLINT(6),
        defaultValue: 0
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING(30)
    },
    slack: {
        allowNull: true,
        type: DataTypes.STRING(35)
    },
    status: {
        allowNull: true,
        type: DataTypes.SMALLINT(6)
    },
    profileImage: {
        field: 'profile_image',
        allowNull: true,
        type: DataTypes.STRING(35),
        get(){
            const rawValue = `${PATH_FILES}${this.getDataValue('profileImage')}`;
            return rawValue;
        }
    },
    license: {
        allowNull: true,
        type: DataTypes.STRING(35)
    },
    licenseType: {
        field: 'license_type',
        allowNull: true,
        type: DataTypes.STRING(35)
    },
    apto:{
        allowNull: true,
        type: DataTypes.STRING(35)
    },
    dateAdmission: {
        field: 'date_admission',
        allowNull: true,
        type: DataTypes.DATE
    }
}

class OperatorActuar extends Model {
    static associate(models){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName: OPERATOR_ACTUAR_TABLE,
            modelName: 'OperatorActuar',
            timestamps: false,
            hooks:{},
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
    OPERATOR_ACTUAR_TABLE,
    OperatorActuarSchema,
    OperatorActuar
}