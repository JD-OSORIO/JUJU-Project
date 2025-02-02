const User = require('../models/user_model');
const mongoose = require('mongoose');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne(email);
    }

    async create(userData) {
        return await User.create(userData);
    }
    /*Este lo aplique ya que el email aplicaba una estructura erronea, por lo tanto busque la solución
    y no la encontre entonces decidi separarlo para que me llegara el dato que necesito en especifico */
    async findByEmailStrict(email) {
        return await User.findOne({ email });  
    }

    async updateById(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    }

    async findById(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return null; // Evita errores si el ID no es válido
        }
        return await User.findById(new mongoose.Types.ObjectId(userId));
    }

    async deleteById(userId) {
        return await User.findByIdAndDelete(userId);
    }

    async findAll() {
        return await User.find();
    }
}



module.exports = new UserRepository();