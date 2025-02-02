const express = require('express');
const cors = require('cors')
const app = express();
require('./config/db');
/*Decidi Utilizar esto para que pueda recibir y procesar datos
En formato JSON en las peticiones HTTP*/
app.use(express.json());
/*Utilizo esto para que los datos recibidos sean
simples y no tan estructurados que es lo que se va a construir*/
app.use(express.urlencoded({extended: false}));
//Middleware de errores
app.use(require('./middlewares/errorHandler'))
app.use(cors('http://localhost:4200/'));

//Rutas
app.use('/api/v1', require('./routes/api'))

module.exports = app; 