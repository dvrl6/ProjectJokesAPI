import axios from 'axios'; //para realizar solicitudes HTTP
import mongoose from 'mongoose';
import { Joke } from '../models/Joke.js'; //importa el modelo para interactuar con la BD

//Función para obtener un chiste basado en un parámetro de consulta. Diana Rodriguez. Endpoint #1.
export const getJoke = async (req, res) => {
    const { param } = req.query; //extrae el parametro desde la solicitud

    try {
        if (param === 'Chuck') {
            //Obtener un chiste de Chuck Norris
            const response = await axios.get('https://api.chucknorris.io/jokes/random');
            return res.status(200).json({ joke: response.data.value });
        } else if (param === 'Dad') {
            //Obtener un Dad Joke
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' }
            });
            return res.status(200).json({ joke: response.data.joke });  
        } else if (param === 'Propio') {
            //Obtener un chiste interno de la base de datos
            const jokes = await Joke.find(); //Busca todos los chistes en la base de datos
            //Si no hay chistes en la base de datos, retornar un mensaje
            if (jokes.length === 0) {
                return res.status(200).json({ message: 'Aun no hay chistes, cree uno!' });
            }
            //Si hay chistes en la base de datos, retornar un chiste aleatorio
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return res.status(200).json({ joke: randomJoke.text }); 
        } else {
            return res.status(400).json({ error: 'Parámetro no válido. Intente con Chuck, Dad o Propio'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el chiste' });
    }  
};

 //Funcion para crear un nuevo chiste. Diana Rodriguez. Endpoint #2.
export const createJoke = async (req, res) => {

};

//Funcion para actualizar un chiste. Diana Rodriguez. Endpoint #3.
export const updateJoke = async (req, res) => {

};

//Funcion para borrar un chiste segun el ID dado. Abraham Carranza. Endpoint #4.
export const deleteJokeById = async (req, res) => {

};

//Funcion para obtener un chiste segun el ID dado. Abraham Carranza. Endpoint #5.
export const getJokeById = async (req, res) => {

};

//Funcion Para obtener la cantidad de chistes que hay en la base de datos por su categoría. Andrea Torres. Endpoint #6.
export const getJokesByCategory = async (req, res) => {

};  

//Funcion para obtener todos los chistes que hay en la base de datos por puntaje de que tan bueno es, se tiene que pasar parámetro por URL. Andrea Torres. Endpoint #7.
export const getJokesByRating = async (req, res) => {

};  