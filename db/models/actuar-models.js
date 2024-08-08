const { UserActuar, UserActuarSchema } = require('./actuar/user.model');
const { OperatorActuar, OperatorActuarSchema} = require('./actuar/operator.model');
const { PermissionActuar, PermissionActuarSchema } = require('./actuar/permission.model');
const { ModuleActuar, ModuleActuarSchema } = require('./actuar/modules.model');
const { UserPermissionActuar, UserPermissionActuarSchema } = require('./actuar/userPermission.model');

function setupModels(sequelize){
    UserActuar.init(UserActuarSchema, UserActuar.config(sequelize));
    OperatorActuar.init(OperatorActuarSchema, OperatorActuar.config(sequelize));
    PermissionActuar.init(PermissionActuarSchema, PermissionActuar.config(sequelize));
    ModuleActuar.init(ModuleActuarSchema, ModuleActuar.config(sequelize));
    UserPermissionActuar.init(UserPermissionActuarSchema, UserPermissionActuar.config(sequelize));

    //Relaciones
    UserActuar.associate(sequelize.models);
    OperatorActuar.associate(sequelize.models);
    PermissionActuar.associate(sequelize.models);
    ModuleActuar.associate(sequelize.models);
    UserPermissionActuar.associate(sequelize.models);
}

module.exports = setupModels;