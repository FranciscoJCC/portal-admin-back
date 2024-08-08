const boom = require('@hapi/boom');

const sequelizeActuar = require('../../libs/actuar.sequelize');
const { Op } = require('sequelize');

class UserActuarService {
    constructor(){}

    async list(query){
        const limit = (query.limit) ? parseInt(query.limit) : 10;
        const offset = (query.offset) ? parseInt(query.offset) : 0;
        const name = query.name;
        const active = query.active;

        let options = {
            where: {},
            order: [[ 'id' , 'DESC' ]],
            limit,
            offset
        }

        if(active && active !== "" && active !== "undefined"){
            options.where.active = {
                [Op.eq] : active
            }
        }

        if(name && name !== "" && name !== undefined){
            options.where.name = {
                [Op.like] : `%${name}%`
            }
        }
        
        const data = await sequelizeActuar.models.UserActuar.findAndCountAll(options);

        const totalRecords = data.count;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            data: data.rows,
            totalRecords,
            totalPages,
        };
    }

    async findOne(id){
        const user = await sequelizeActuar.models.UserActuar.findByPk(id);

        if(!user){
            throw boom.notFound("User not found");
        }

        return user;
    }

    async create(data){
        const newUser = await sequelizeActuar.models.UserActuar.create(data);

        return newUser;
    }

    async update(id, changes){
        const user = await this.findOne(id);

        const response = await user.update(changes);

        return response;
    }
}

module.exports = UserActuarService;