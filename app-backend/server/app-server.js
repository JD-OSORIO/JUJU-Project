/*Este app - server.js se encargar de correr el servidor de manera efectiva
para poder que cuando se realicen las pruebas no se ejecute el servidor permitiendo
la realización de las pruebas correctamente.

Decidi utilizar este metodo ya que me permite ejecutar el server de manera aislada
y al mismo tiempo poder realizar las pruebas de manera sencilla*/
const express = require('express');
require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor esta escuchando en el puerto ${PORT}`)
})