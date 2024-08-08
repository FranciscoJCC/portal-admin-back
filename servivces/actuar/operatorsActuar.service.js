const boom = require('@hapi/boom');

const sequelizeActuar = require('../../libs/actuar.sequelize');
const { Op } = require('sequelize');

class OperatorActuarService {
    constructor(){}

    async list(query){
        const limit = (query.limit) ? parseInt(query.limit) : 10;
        const offset = (query.offset) ? parseInt(query.offset) : 0;
        const name = query.name;
        const active = query.active;

        let options = {
            where: {},
            order: [[ 'id', 'DESC' ]],
            limit,
            offset
        }

        if(active && active !== "" && active !== "undefined"){
            options.where.status = {
                [Op.eq] : active
            }
        }

        if(name && name !== "" && name !== undefined){
            options.where.name = {
                [Op.like] : `%${name}%`
            }
        }

        const data = await sequelizeActuar.models.OperatorActuar.findAndCountAll(options);

        const totalRecords = data.count;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            data: data.rows,
            totalRecords,
            totalPages,
        };
    }

    async findOne(id){
        const operator = await sequelizeActuar.models.OperatorActuar.findByPk(id);

        if(!operator){
            throw boom.notFound("Operator not found");
        }

        return operator;
    }

    async create(data){
        const newOperator = await sequelizeActuar.models.OperatorActuar.create(data);

        return newOperator;
    }

    async updateProfileImage(data){
        
    }

    async update(id, changes){
        const operator = await this.findOne(id);

        const response = await operator.update(changes);

        return response;
    }
}

module.exports = OperatorActuarService