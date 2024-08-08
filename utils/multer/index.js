const multer = require('multer');
const path = require('path');
const config = require('../../config');

//Guardamos los archivos multimedia
const storageFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.isPROD == 'true' ? config.PATH_FILES_PROD : config.PATH_FILES_DEV);
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split(".");
        cb(null, new Date().getTime() + '.' + extension[extension.length - 1]);
    }
});

//Middleware para subir archivos
var uploadFiles = multer({ storage: storageFiles });

//Retornamos el path del archivo solicitado
async function returnPath(filename) {
    let pathFiles = config.NODE_ENV === "prod" ? config.PATH_FILES_PROD : config.PATH_FILES_DEV;
    let filePath = path.resolve(pathFiles + '' + filename)
        
    return filePath;
}

module.exports = {
    uploadFiles,
    returnPath
}