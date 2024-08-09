const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const sequelizeActuar = require('../../libs/actuar.sequelize');


class ModuleActuarService {
    constructor(){}

    async list(query){
        const limit = (query.limit) ? parseInt(query.limit) : 10;
        const offset = (query.offset) ? parseInt(query.offset) : 0;
        const active = query.active;
        const name = query.name;

        let options = {
            where:{},
            //include: ['permissionsActuar'],
            limit,
            offset
        }

        if(active && active !== ""){
            options.where.status = {
                [Op.eq] : active
            }
        }

        if(name && name !== ""){
            options.where.name = {
                [Op.like] : `%${name}%`
            }
        }
        
        const data = await sequelizeActuar.models.ModuleActuar.findAndCountAll(options);

        const totalRecords = data.count;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            data: data.rows,
            totalRecords,
            totalPages,
        };
    }

    async listModulesWPermissions(){
        let options = {
            where: {
                status: {
                    [Op.eq] : 1
                }
            },
            include: ['permissionsActuar']
        }

        const data = await sequelizeActuar.models.ModuleActuar.findAll(options);

        return data;
    }

    async findOne(id){
        const module = await sequelizeActuar.models.ModuleActuar.findByPk(id);

        if(!module){
            throw boom.notFound("Module not found");
        }

        return module;
    }

    async create(data){
        const newModule = await sequelizeActuar.models.ModuleActuar.create(data);

        return newModule;
    }

    async update(id, changes){
        const module = await this.findOne(id);

        const response = await module.update(changes);

        return response;
    }

    async delete(id){
        const module = await this.findOne(id);

        await module.update({ status: 0 });

        return { id }
    }
}

module.exports = ModuleActuarService;