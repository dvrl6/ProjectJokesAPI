import express from 'express'; // para crear la aplicacion web
import cors from 'cors'; //middleware para permitir solicitudes de diferentes origenes
import dotenv from 'dotenv'; //para manejar variables de entorno
import mongoose from 'mongoose'; //para interactuar con DB MongoDB
import jokeRoutes from './routes/JokeRoutes.js'; 

import { swaggerDocs as V1SwaggerDocs } from '../swagger.js';

dotenv.config();
const app = express();
const port = 3005;

app.use(cors({ origin: '*' })); //config para permitir las solicitudes de diferentes origienes
app.use(express.json({ limit: '50mb' })); // Middleware para parsear el cuerpo de las solicitudes JSON y establecer un límite de tamaño
app.use(express.urlencoded({ extended: false })); // Middleware para parsear datos URL-encoded (formulario)

// Función para conectar a la base de datos MongoDB
const connectDB = () => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOSTNAME,
        MONGO_PORT,
        MONGO_DB
    } = process.env;

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

    mongoose.connect(url)
        .then(() => {
            console.log('Conexión a MongoDB exitosa');
        })
        .catch((err) => {
            console.log('Error de conexión:', err);
        });
};

// Condicion para conectar a la base de datos solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}
// Configura las rutas bajo el prefijo '/api'
app.use('/api', jokeRoutes); 

// Inicia el servidor y escucha en el puerto definido
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    V1SwaggerDocs(app,port);
});

export { app, server };