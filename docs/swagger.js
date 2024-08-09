const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Especifica la versión de OpenAPI
    info: {
      title: "Documentación API REST",
      version: "1.0.0",
      description: "API REST - PANEL ADMIN",
    },
    servers: [
      {
        url: "http://localhost:8098/api/v1", // La URL base de tu API
        description: "Servidor local de desarrollo"
      },
      {
        url: "http://192.168.1.216:8098api/v1",
        description: "Servidor de producción"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/v1', '***','*.js')], // Ruta a los archivos que contienen las anotaciones Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

function setupSwagger(app){
    app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = setupSwagger
