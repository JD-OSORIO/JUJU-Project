const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor() {
        /*Decidi implementar el patron de diseño (Singleton) para evitar multiples conexiones
        a la base de datos, garantizandome una eficiencia y estabilidad en la conexion
        aunque no es recomendable utilizar ese patron, como es una aplicación no tan escalable
        lo aplico para que sea mas eficiente */
        if (!Database.instance) {
            mongoose.connect(process.env.MONGO_URI);
            this.connection = mongoose.connection;
            /*El manejo de error en esta parte me permite saber si falla algo a la hora
            de entrar a la base de datos */
            this.connection.on('error', (err) => {
                console.error(`Error al conectar la base de datos: ${err}`);
            });
            /*Una confirmación para saber si me he conectado a la base de datos
            y poder mandar peticiones */
            this.connection.once('open', () => {
                console.log('Conectado a la base de datos de MongoDB');
            });

            Database.instance = this;
        }

        return Database.instance;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = new Database().getConnection();
