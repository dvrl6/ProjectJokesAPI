import request from 'supertest';
import { app } from '../src//index.js'; 
import { Joke } from '../src/models/Joke.js';

//Prueba Unitaria para el endpoint GET obtener chiste
describe('GET /api/getJoke', () => {
    //Antes de cada prueba, limpia la colección de chistes
    beforeEach(async () => {
        await Joke.deleteMany({}); 
    });

    it('debería obtener un chiste de Chuck Norris', async () => {
        const response = await request(app)
            .get('/api/getJoke?param=Chuck');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('joke');
        expect(typeof response.body.joke).toBe('string');
    });

    it('debería obtener un Dad Joke', async () => {
        const response = await request(app)
            .get('/api/getJoke?param=Dad');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('joke');
        expect(typeof response.body.joke).toBe('string');
    });

    it('debería obtener un chiste propio', async () => {
        //Para asegurar que hay al menos un chiste en la base de datos
        await request(app)
            .post('/api/createJoke')
            .send({
                text: 'Chiste de prueba',
                author: 'Autor',
                rating: 5,
                category: 'Chistoso'
            });

        const response = await request(app)
            .get('/api/getJoke?param=Propio');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('joke');
        expect(typeof response.body.joke).toBe('string');
    });

    it('debería retornar un mensaje si no hay chistes propios', async () => {
        //La colección ya está vacía debido a beforeEach
        const response = await request(app)
            .get('/api/getJoke?param=Propio');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Aun no hay chistes, cree uno!');
    });

    it('debería retornar un error si el parámetro es inválido', async () => {
        const response = await request(app)
            .get('/api/getJoke?param=Invalido');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Parámetro no válido. Intente con Chuck, Dad o Propio');
    });
});

//Prueba Unitaria para el endpoint GET crear un chiste
describe('POST /api/createJoke', () => {
    beforeEach(async () => {
        await Joke.deleteMany({}); 
    });

    it('debería crear un nuevo chiste y retornar su información', async () => {
        const response = await request(app)
            .post('/api/createJoke')
            .send({
                text: '¿Por qué cruzó la carretera? Para llegar al otro lado.',
                author: 'Juanito',
                rating: 8,
                category: 'Chistoso'
            });

        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty('message', 'Chiste creado exitosamente.'); //Verifica el mensaje de éxito
        expect(response.body).toHaveProperty('savedJoke'); //Verifica que se retorne el objeto savedJoke

        const savedJoke = response.body.savedJoke; //Obtiene el objeto del chiste guardado
        expect(savedJoke).toHaveProperty('_id'); 
        expect(savedJoke.text).toBe('¿Por qué cruzó la carretera? Para llegar al otro lado.');
        expect(savedJoke.author).toBe('Juanito'); 
        expect(savedJoke.rating).toBe(8); 
        expect(savedJoke.category).toBe('Chistoso'); 
    });

    it('debería crear un chiste con autor por defecto si no se proporciona', async () => {
        const response = await request(app)
            .post('/api/createJoke')
            .send({
                text: '¿Cuál es el café más peligroso del mundo? El ex-preso.',
                rating: 7,
                category: 'Dad joke'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Chiste creado exitosamente.');
        expect(response.body).toHaveProperty('savedJoke');

        const savedJoke = response.body.savedJoke;
        expect(savedJoke.author).toBe('Se perdió en el Ávila como Led'); //Verifica que se use el autor por defecto
    });

    it('debería retornar un error si falta el texto del chiste', async () => {
        const response = await request(app)
            .post('/api/createJoke')
            .send({
                author: 'Juanito',
                rating: 5,
                category: 'Chistoso'
            });

        expect(response.status).toBe(400); 
        expect(response.body.error).toBe('El campo "texto" es requerido.');
    });

    it('debería retornar un error si el puntaje está fuera del rango', async () => {
        const response = await request(app)
            .post('/api/createJoke')
            .send({
                text: 'Chiste',
                author: 'Juanito',
                rating: 11, 
                category: 'Chistoso'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('El campo "puntaje" es requerido y debe estar entre 1 y 10.');
    });

    it('debería retornar un error si la categoría no es válida', async () => {
        const response = await request(app)
            .post('/api/createJoke')
            .send({
                text: 'Chiste',
                author: 'Juanito',
                rating: 5,
                category: 'Invalido' 
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso o Malo.');
    });
});

//Prueba Unitaria para el endpoint PUT actualizar un chiste por ID
describe('PUT /api/updateJoke/:id', () => {
    let jokeId;

    beforeEach(async () => {
        await Joke.deleteMany({}); 

        //Crea un chiste para poder actualizarlo
        const joke = await Joke.create({
            text: 'Chiste original',
            author: 'Autor',
            rating: 5,
            category: 'Chistoso'
        });

        jokeId = joke._id; 
    });

    it('debería actualizar un chiste existente y retornar un mensaje de éxito', async () => {
        const response = await request(app)
            .put(`/api/updateJoke/${jokeId}`)
            .send({
                text: 'Chiste actualizado',
                author: 'Nuevo Autor',
                rating: 8,
                category: 'Dad joke'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Chiste actualizado exitosamente.'); 
        expect(response.body).toHaveProperty('updatedJoke'); //Verifica que se retorne el chiste actualizado

        const updatedJoke = response.body.updatedJoke;
        expect(updatedJoke).toHaveProperty('text', 'Chiste actualizado');
        expect(updatedJoke).toHaveProperty('author', 'Nuevo Autor');
        expect(updatedJoke).toHaveProperty('rating', 8);
        expect(updatedJoke).toHaveProperty('category', 'Dad joke');
    });

    it('debería retornar un error si el chiste no existe', async () => {
        const response = await request(app)
            .put('/api/updateJoke/60c72b2f9b1e8c001c8e4f1d') //ID no existente
            .send({
                text: 'Chiste nuevo',
                author: 'Autor',
                rating: 7,
                category: 'Chistoso'
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Chiste no encontrado por el ID dado.');
    });

    it('debería retornar un error si se proporciona un ID inválido', async () => {
        const response = await request(app)
            .put('/api/updateJoke/invalidId')
            .send({
                text: 'Chiste nuevo',
                author: 'Autor',
                rating: 7,
                category: 'Chistoso'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('ID no válido');
    });

    it('debería retornar un error si se intenta modificar el campo _id', async () => {
        const response = await request(app)
            .put(`/api/updateJoke/${jokeId}`)
            .send({
                text: 'Chiste nuevo',
                author: 'Autor',
                rating: 7,
                category: 'Chistoso',
                _id: jokeId //Intentando modificar el _id
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No se puede modificar el campo "_id".');
    });

    it('debería retornar un error si el puntaje está fuera del rango', async () => {
        const response = await request(app)
            .put(`/api/updateJoke/${jokeId}`)
            .send({
                rating: 11
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('El campo "puntaje" debe estar entre 1 y 10.');
    });

    it('debería retornar un error si la categoría no es válida', async () => {
        const response = await request(app)
            .put(`/api/updateJoke/${jokeId}`)
            .send({
                category: 'Categoría Invalida' 
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso o Malo.');
    });
});
