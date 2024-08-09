const boom = require('@hapi/boom');

const sequelizePortalAdmin = require('./../../libs/panelAdmin.sequelize');
const { Op } = require('sequelize');

class UserService {
    constructor(){}

    async list(query){

        const limit = (query.limit) ? parseInt(query.limit) : 10;
        const offset = (query.offset) ? parseInt(query.offset) : 0;
        const name = query.name;
        const status = query.status;

        let options = {
            where: {},
            order: [[ 'id', 'DESC' ]],
            limit,
            offset
        }

        if(name && name !== "" && name !== undefined){
            options.where.name = {
                [Op.like] : `%${name}%`
            }
        }

        if(status && status !== "" && status !== undefined){
            options.where.status = {
                [Op.eq] : status
            }
        }

        const data = await sequelizePortalAdmin.models.User.findAndCountAll(options);

        const totalRecords = data.count;
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            data: data.rows,
            totalRecords,
            totalPages,
        };
    }

    async findOne(id){
        const user = await sequelizePortalAdmin.models.User.findByPk(id);

        if(!user){
            throw boom.notFound("User not found");
        }

        return user;
    }

    async findByEmail(email){
        const user = await sequelizePortalAdmin.models.User.scope('allProperties').findOne({
            where: { email }
        });

        return user;
    }

    async create(data){
        const newUser = await sequelizePortalAdmin.models.User.create(data);

        delete newUser.dataValues.password;

        return newUser;
    }

    async update(id, changes){
        const user = await this.findOne(id);

        const response = await user.update(changes);

        delete response.dataValues.password;

        return response;
    }

    async delete(id){
        const user = await this.findOne(id);

        await user.update({ status: 0 });

        return { id }
    }
}

module.exports = UserService;