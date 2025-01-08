import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Metadata o información sobre nuestra API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JokesApi",
            version: '1.0.0',
        },
    },
    apis: ['./src/Routes/JokeRoutes.js'],
};

// Documentación en formato JSON
const swaggerSpec = swaggerJSDoc(options);

// Función para configurar nuestra documentación
const swaggerDocs = (app, port) => {
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Versión 1 de la documentación está disponible en http://localhost:${port}/api`);
};

export { swaggerDocs };