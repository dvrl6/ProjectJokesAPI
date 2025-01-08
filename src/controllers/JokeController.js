import axios from 'axios'; //para realizar solicitudes HTTP
import mongoose from 'mongoose';
import { Joke } from '../models/Joke.js'; //importa el modelo para interactuar con la BD

//Función para obtener un chiste basado en un parámetro de consulta. Diana Rodriguez. Endpoint #1.
export const getJoke = async (req, res) => {
 
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