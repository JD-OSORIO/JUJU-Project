const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');
const db = require('../config/db');

let server;

beforeAll(async () => {
    if (db.readyState !== 1) {
        await new Promise((resolve, reject) => {
            db.once('open', resolve);
            db.on('error', reject);
        });
    }
    
    // Usa un puerto dinámico para evitar EADDRINUSE
    server = app.listen(0, () => console.log("Servidor de pruebas iniciado"));
});

afterAll(async () => {
    await mongoose.connection.close();  
    server.close();  
});