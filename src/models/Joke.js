import mongoose from 'mongoose';

//Definición del esquema para el modelo de Jokes / Chistes
const jokeSchema = new mongoose.Schema({
    text: { type: String, required: true }, 
    author: { type: String, default: "Se perdió en el Ávila como Led" }, 
    rating: { type: Number, required: true, min: 1, max: 10 }, 
    category: { 
        type: String, 
        required: true, 
        enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'] 
    }
});

//Creacion del modelo a partir del esquema definido anteriormente
export const Joke = mongoose.model('Joke', jokeSchema);
