const { model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'regular'}
})

module.exports = model('user', userSchema);