import express from 'express';
import {getJoke, createJoke, updateJoke, deleteJokeById, getJokeById, getJokesByRating, getJokesByCategory} from '../controllers/JokeController.js';
 
// Crea un enrutador de Express
const router = express.Router();

 // Define la ruta para obtener un chiste por parametro
router.get('/getJoke', getJoke);

// Define la ruta para crear un nuevo chiste
router.post('/createJoke', createJoke);

// Define la ruta para actualizar un chiste existente por id
router.put('/updateJoke/:id', updateJoke); 

// Define la ruta para eliminar un chiste existente por id
router.delete('/deleteJoke/:id?', deleteJokeById);

// Define la ruta para obtener un chiste existente por id
router.get('/getJokeById/:id?', getJokeById);

//Define la ruta para obtener todos los chistes de una categoría específica
router.get('/getJokesByCategory/:category', getJokesByCategory);

//Define la ruta para obtener todos los chistes de un puntaje específico
router.get('/getJokesByRating/:rating', getJokesByRating);

export default router;