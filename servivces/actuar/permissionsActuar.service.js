const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const sequelizeActuar = require('../../libs/actuar.sequelize');

class PermissionActuarService {
    constructor(){}

    async list(query){
        const limit = (query.limit) ? parseInt(query.limit) : 10;
        const offset = (query.offset) ? parseInt(query.offset) : 0;
        const active = query.active;
        const name = query.name;

        let options = {
            where: {},
            include: ['moduleActuar'],
            limit,
            offset
        }

        if(active && active !== "" && active !== "undefined"){
            options.where.status = {
                [Op.eq] : active
            }
        }

        if(name && name !== "" && name !== "undefined"){
            options.where.name = {
                [Op.like] : `%${name}%`
            }
        }
        
        const data = await sequelizeActuar.models.PermissionActuar.findAndCountAll(options);

        const totalRecords = data.count;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            data: data.rows,
            totalRecords,
            totalPages,
        };
    }

    async findOne(id){
        const permission = await sequelizeActuar.models.PermissionActuar.findByPk(id);

        if(!permission){
            throw boom.notFound("Permission not found");
        }

        return permission;
    }

    async create(data){
        const newPermission = await sequelizeActuar.models.PermissionActuar.create(data);

        return newPermission;
    }

    async update(id, changes){
        const permission = await this.findOne(id);

        const response = await permission.update(changes);

        return response;
    }

    async delete(id){
        const permission = await this.findOne(id);

        await permission.update({ status: 0 });

        return { id }
    }
}

module.exports = PermissionActuarService;