const { model, Schema} = require('mongoose')

//En general el modelo especificando que es obligatorio.

const userSchema = new Schema({
    username: {type: String, required: true},
    //Email es el Username de inicio de sesion.
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'regular'}
})

module.exports = model('user', userSchema);