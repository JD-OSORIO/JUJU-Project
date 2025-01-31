const bcrypt = require('bcryptjs');
const TokenService = require('./token_service');
const userRepository = require('../repositories/userRepository');
const UserFactory = require('../utils/userFactory');
const AppError = require('../utils/appError');

class AuthService {
    async login(email, password) {
        const user = await userRepository.findByEmail({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new AppError('Usuario o contraseña incorrectos', 401);
        }

        return { success: 'Login correcto', token: TokenService.generateToken(user) };
    }

    async createUser(userData) {
      const existingUser = await userRepository.findByEmailStrict(userData.email);
    
    if (existingUser) {
        throw new AppError('El correo ya está registrado', 400);
    }

        const newUser = UserFactory.createUser(userData);
        return await userRepository.create(newUser);
    }
}

module.exports = new AuthService();
