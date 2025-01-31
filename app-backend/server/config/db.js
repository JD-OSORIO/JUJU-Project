const mongoose = require('mongoose');

class Database {
    constructor() {
        if (!Database.instance) {
            mongoose.connect(process.env.MONGO_URL);
            this.connection = mongoose.connection;

            this.connection.on('error', (err) => {
                console.error(`Error al conectar la base de datos: ${err}`);
            });

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
