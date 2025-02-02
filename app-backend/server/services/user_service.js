const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');
const hashPassword = require('../middlewares/hasPassword');

class UserService{

    async updateUser(userId, updateData) {
        if (updateData.password) {
            updateData.password = await hashPassword(updateData.password);
        }
    
        const updatedUser = await userRepository.updateById(userId, updateData);
    
        if (!updatedUser) {
            throw new AppError('Usuario no encontrado', 404);
        }
    
        return updatedUser;
    }

    async getUserById(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('ID de usuario inválido', 400);
        }
    
        const user = await userRepository.findById(userId);
    
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }
    
        return { success: 'Usuario encontrado correctamente', user };
    }

    
    async deleteUser(userId) {
        const user = await userRepository.deleteById(userId);
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }

        return { success: 'Usuario eliminado correctamente' };
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }
}


module.exports = new UserService();
