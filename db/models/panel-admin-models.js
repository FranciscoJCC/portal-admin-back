const { User, UserSchema } = require('./panelAdmin/user.model');
const { Permission, PermissionSchema } = require('./panelAdmin/permission.model');
const { UserPermission, UserPermissionSchema } = require('./panelAdmin/userPermission.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Permission.init(PermissionSchema, Permission.config(sequelize));
    UserPermission.init(UserPermissionSchema, UserPermission.config(sequelize));

    User.associate(sequelize.models);
    Permission.associate(sequelize.models);
    UserPermission.associate(sequelize.models);
}

module.exports = setupModels;