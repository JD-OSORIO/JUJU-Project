const express = require('express');
const cors = require('cors')
require('dotenv').config();
require('./config/db');

const app = express();

//Middlewares
//Cors
app.use(cors('http://localhost:4200/'));
/*Decidi Utilizar esto para que pueda recibir y procesar datos
En formato JSON en las peticiones HTTP*/
app.use(express.json());
/*Utilizo esto para que los datos recibidos sean
simples y no tan estructurados que es lo que se va a construir*/
app.use(express.urlencoded({extended: false}));

//Rutas
app.use('/api/v1', require('./routes/api'))

//Middleware de errores
app.use(require('./middlewares/errorHandler'))



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor esta escuchando en el puerto ${PORT}`)
})