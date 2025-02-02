const { model, Schema } = require('mongoose')


//En general el modelo especificando que es obligatorio.

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    yearPublished: {type: Number, required: true},
    //Estado del libro (disponible o reservado), con valor predeterminado 'true' (disponible).
    bookStatus: {type: Boolean, default: true},
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true } // Relación con usuario
});

module.exports = model('book', bookSchema)