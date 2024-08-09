const boom = require('@hapi/boom');

const sequelizeActuar = require('../../libs/actuar.sequelize');
const { Op, where } = require('sequelize');
const { response } = require('express');

class UserPermissionActuarService {
    
    constructor(){}
    
    async syncUpUserPermissions(data){
        
        const userId = data.userId;
        const typeUser = data.typeUser;
        const permissions = data.permissions;

        //Buscamos si existen permisos registrados
        const permissionsSearch = await this.searchPermissionByUser(userId, typeUser);
        
        //Eliminamos los permisos
        if(permissionsSearch.length > 0){
            const response = await this.deletePermissionsByUser(userId, typeUser);
        }

        //Registramos los permisos
        for (let i = 0; i < permissions.length; i++) {
            if(permissions[i].status === 1){
                await sequelizeActuar.models.UserPermissionActuar.create({
                    userId: userId,
                    permissionId: permissions[i].id,
                    typeUser: typeUser
                })
            }
        }

        //Buscamos los permisos asignados
        const newPermissions = await this.searchPermissionByUser(userId, typeUser);

        return {...newPermissions, "userId" : userId, "typeUser" : typeUser };
    }

    //Busca todos los permisos del usuario
    async searchPermissionByUser(userId, typeUser){

        let options = {
            where: {
                userId: {
                    [Op.eq] : userId
                },
                typeUser: {
                    [Op.eq] : typeUser
                }
            }
        }

        const permissions = await sequelizeActuar.models.UserPermissionActuar.findAll(options);

        return permissions;
    }

    //Borra todos los permisos del usuario
    async deletePermissionsByUser(userId, typeUser){
        let options = {
            where: {
                userId: {
                    [Op.eq] : userId
                },
                typeUser: {
                    [Op.eq] : typeUser
                }
            }
        }

        const response = await sequelizeActuar.models.UserPermissionActuar.destroy(options)

        return response;
    }
}

module.exports = UserPermissionActuarService;
