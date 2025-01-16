# ProjectJokesAPI
Proyecto de Topicos Especiales de Programacion. Diana Rodriguez @dvrl6, Abraham Carranza @AJCDS2602 y Andrea Torres @Andytxxn. Seccion 16343. GRUPO 3.







PARA LOGRAR CORRER EL PROYECTO:

npm install

(NOTA: se descargaran las siguientes dependencias 
npm init -y
npm install express mongoose axios
npm install dotenv
npm install cors
npm install --save-dev jest supertest
npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript babel-jest
npm install --save-dev mongodb-memory-server
npm install --save-dev cross-env
npm install swagger-jsdoc swagger-ui-express
)

CREAR UN .ENV CON LAS CREDENCIALES DESEADAS, ES DECIR, CON LA QUE MANEJE SU BASE DE DATOS EN MONGO MIENTRAS SE TENGA LO SIGUIENTE:

MONGO_USERNAME=?????
MONGO_PASSWORD=????
MONGO_PORT=????
MONGO_DB=????
MONGO_HOSTNAME=????

CAMBIAR ???? POR LOS DATOS REALES







PARA LA EJECUCION DEL SCRIPT / SERVIDOR USAR:

node src/index.js 

Desde la terminal con la direccion raiz del proyecto ProjectJokesAPI si trabaja con MONGO_HOSTNAME=localhost

Si trabajara con MONGO_HOSTNAME=mongo ante los cambios realizados con el Dockerfile y docker-compose.yml entonces usar

docker-compose up --build






SWAGGER:

Cuando aparezca en consola "Servidor corriendo en http://localhost:3005/api" dele click al url dado para ser rederigido a la documentacion en swagger






PARA PROBAR LOS ENDPOINTS: (probados desde Postman Desktop)

1. GET. Obtener un chiste. Por Diana Rodriguez.

Para obtener un chiste de Chuck Norris:

GET http://localhost:3005/api/getJoke?param=Chuck

Para obtener un Dad Joke: 

GET http://localhost:3005/api/getJoke?param=Dad

Para obtener un chiste de la base de datos / propio :

GET http://localhost:3005/api/getJoke?param=Propio

2. POST. Crear un chiste. Por Diana Rodriguez.

Para crear un chiste :

POST http://localhost:3005/api/createJoke

Ejemplo para prueba :

{
    "text": "¿Cómo se despiden los químicos? ¡Ácido un placer!",
    "author": "Pepe",
    "rating": 5,
    "category": "Malo"
}

3. PUT. Actualizar un chiste. Por Diana Rodriguez.

PUT http://localhost:3005/api/updateJoke/id

Ejemplo para prueba : 

http://localhost:3005/api/updateJoke/677740b3bbde196c29c67b55

(ojo, reemplazar el id por uno que si exista en su base de datos)

{
    "category": "Chistoso"
}

4. DELETE. Borrar un chiste. Por Abraham Carranza.

DELETE http://localhost:3005/api/deleteJokeById/:id

5. GET. Obtener un chiste por ID. Por Abraham Carranza.

GET http://localhost:3005/api/getJokeById/:id

6. GET. Obtener cantidad de chistes por categoria. Por Andrea Torres.

GET http://localhost:3005/api/getJokesByCategory/:category

CATEGORIAS ACEPTADAS : 'Dad joke', 'Humor Negro', 'Chistoso', 'Malo'

7. GET. Obtener todos los chistes que hay por puntaje. Por Andrea Torres.

GET http://localhost:3005/api/getJokesByRating:/rating

RATING ACEPTADOS : del 1 al 10.







PARA PROBAR LOS ENDPOINTS CON PRUEBAS UNITARIAS: (probados con framework JEST)

Utilizar el comando:

npm test

Desde la terminal con la direccion raiz del proyecto ProjectJokesAPI








COMENTARIOS.
Dificultades : Aprender a usar Jest para las pruebas unitarias. 
El uso de las ramas en flujo Gitflow.
