const boom = require('@hapi/boom');
const config = require('../config');
const fs = require('fs');
const path = require('path');

async function validateFileHandler(req, res, next){
    const file = req.body.filename;
    let pathFiles = config.NODE_ENV === "prod" ? config.PATH_FILES_PROD : config.PATH_FILES_DEV;
    let filePath = path.resolve(pathFiles + '' + file)

    await fs.access(filePath, fs.constants.F_OK, (err) => {
        if(err){
            res.status(404).json({ status: false, message: "File not found" });
        }
    });

    next();
}

module.exports = validateFileHandler;