# Módulo de Backend Avanzado
Bienvenido al repositorio del curso de Backend Avanzado. Este curso está diseñado para continuar profundizando el conocimiento de base de datos y backend a través de API REST con Node JS, sin embargo en esta ocasión exploraremos las bases de datos NoSQL, específicamente MongoDB.

## Contenido del Curso
### 1. Introducción a Base de Datos NoSQL y MongoDB
Aprenderás la diferencia entre una base de datos relacional (SQL) y las bases de datos no relacionales, así como los diferentes tipos que existen. Así mismo serás capaz de crear una cuenta en MongoDB Atlas y conectarte a una base de datos en la nube sobre la cual realizar operaciones de consulta a través de Visual Studio Code y en el mismo panel de MongoDB Atlas.

#### Herramientas:
- [MongoDB Atlas: Crear cuenta](https://www.mongodb.com/es/cloud/atlas/register/): Crear cuenta en MongoDB Atlas.
- [MongoDB for VS Code](https://www.mongodb.com/products/tools/vs-code/): Extesión de MongoDB for VS Code que nos permite ejecutar un playground de código de MongoDB directamente en VS Code.

### 2. Operaciones CRUD en Mongo + Ejercicios
Continua la parte introductoria de MongoDB, esta vez realizando ejercicios prácticos de operaciones de Agregación, Creación, Actualización y Borrado de datos utilizando el servicio de MongoDB Atlas. También aprenderas a restaurar respaldos de bases de datos con la ayuda de Mongo Compass, para cerrar con la realización de ejercicios de reforzamiento.

#### Recursos
- [Documentación de Operaciones CRUD en MongoDB](https://www.mongodb.com/docs/manual/crud/)
- [Archivo ZIP de Base de Datos de Ejemplo de Restaurantes](https://www.w3resource.com/mongodb-exercises/restaurants.zip)

### 3. Modelado y Esquemas con Moongose + Creación de API con CRUD
Se explicará el uso del ODM Mongoose, así como la definición de esquemas. Para posteriormente implementar en un ejemplo práctico una API REST con Express JS y arquitectura MVC que se conecte a una base de datos en MongoDB Atlas y ejecute operaciones CRUD con ayuda de los modelos de Mongoose. En esta sesión se abarcará hasta el endpoint de creación de registros en la base de datos.

#### Recursos

models/Car.js: Ejemplo básico de un modelo con Mongoose
```js
import mongoose from 'mongoose'

/**
 * 1.- Crear un schema (esqueleto) ✅
 * 2.- Crear modelo, asignando un nombre ✅
 * 3.- Exportar el modelo ✅
 */

const carSchema = new mongoose.Schema({
  // Campo: tipo de dato || Campo: { tipo de dato, restricciones }
  plate: { type: String, required: true, unique: true }, // No. de Placa
  year: { type: Number, required: true }, // Año
  model: { type: String, required: true }, // Modelo
  brand: { type: String, required: true }, // Marca
  version: String,
  color: {
    type: String,
    required: true,
    enum: ['red', 'blue', 'black', 'white', 'silver', 'gray', 'green', 'yellow', 'orange', 'brown', 'purple', 'pink', 'gold']
  },
  carType: {
    type: String,
    required: true,
    enum: ['sedan', 'hatchback', 'suv', 'coupe', 'convertible', 'pickup', 'van', 'minivan', 'sport', 'luxury', 'crossover', 'hybrid', 'electric', 'wagon', 'classic', 'compact']
  },
  vin: { type: String, required: true, unique: true }, // Número de identificación del vehículo
  newCar: { type: Boolean, required: true }, // ¿Es un auto nuevo?
  isActive: { type: Boolean, default: true } // ¿Esta activo?
})

// Creamos el modelo en base al schema, siempre en SINGULAR (mongo lo pluraliza en la DB)
const Car = mongoose.model('Car', carSchema)

export default Car
```

Datos de Ejemplo para creación de registros:
```js
  {
    "plate": "ABC123",
    "year": 2020,
    "model": "Corolla",
    "brand": "Toyota",
    "version": "LE",
    "color": "red",
    "carType": "sedan",
    "vin": "1G1YY2D65C5100987",
    "newCar": true
  }

  {
    "plate": "XYZ456",
    "year": 2022,
    "model": "Mustang",
    "brand": "Ford",
    "color": "blue",
    "carType": "sport",
    "newCar": false,
    "vin": "4HGYY2D65C5100540"
  }

  {
    "plate": "QRS789",
    "year": 2018,
    "model": "CR-V",
    "brand": "Honda",
    "version": "Touring",
    "color": "silver",
    "carType": "suv",
    "vin": "5J6RM4H35EL012345",
    "newCar": false
  }
```

### 4. Continuación de Creación de API con CRUD + Ejercicios
Clase 100% práctica donde se realizarán los endpoints restantes para leer, actualizar y borrar información de la base de datos. Al final deberán realizarse ejercicios para prácticar el conocimiento adquirido.

### 5. Estrategias de Relaciones de Datos + API Rest de Repaso
En MongoDB existen 2 estrategias para relacionar la información, colecciones embebidas y referenciadas. En esta clase se explicarán las diferencias y cuales usar en cada situación. Así mismo se creará un nuevo proyecto de API Rest con MongoDB a manera de repaso de todo lo aprendido hasta el momento.

### 6. API Rest de Repaso + Validaciones + Morgan
Se continua el desarrollo de la API Rest de Repaso, implementando validaciones más robustas. Como plus se verá la libreria de Morgan para realizar logs en consola más informativos de lo que sucede en nuestra API en desarrollo.

### 7. Autenticación y Middlewares
Creación del modelo de usuario, implementación de bcrypt para cifrado de información, generación de JWT y la implementación de middlewares para verificación de tokens y roles de usuario.

## Recursos Complementarios
- [Documentación de MongoDB](https://www.mongodb.com/docs/)
- [Documentación de Mongoose](https://mongoosejs.com/docs/index.html)
- [Configuración de ESLint con Standard JS](https://www.cesarguerra.mx/configuracion-rapida-de-eslint-con-standard-js-para-proyectos-de-javascript-y-de-react-con-vite-js/)

## Autor
Este repositorio y contenidos son realizados por César Guerra.
Puedes usarlos libremente, solo recuerda dar los créditos correspondientes =P.

www.cesarguerra.mx
