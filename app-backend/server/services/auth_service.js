const bcrypt = require('bcryptjs');
const TokenService = require('./token_service');
const userRepository = require('../repositories/userRepository');
const UserFactory = require('../utils/userFactory');
const AppError = require('../utils/appError');


class AuthService {
    async login(email, password) {
        // Utilizo un repositorio para desacoplar la lógica de acceso a datos y facilitar pruebas unitarias.
        const user = await userRepository.findByEmail({ email });
        // Hago uso de bcrypt para mantener la seguridad de las contraseñas sin almacenarlas en texto plano.
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new AppError('Usuario o contraseña incorrectos', 401);
        }
        // Delego la generación del token a un servicio dedicado para mantener la separación de responsabilidades.
        return { success: 'Login correcto', token: TokenService.generateToken(user) };
    }

    async createUser(userData) {
        /* Valido si el usuario ya existe antes de crearlo, evitando duplicados en la base de datos.
        aqui es donde utilizo el findby especifico que coloque en el respositorio para manejar el dato
        como yo queria.*/
      const existingUser = await userRepository.findByEmailStrict(userData.email);
    
    if (existingUser) {
        throw new AppError('El correo ya está registrado', 400);
    }

        const newUser = UserFactory.createUser(userData);
        return await userRepository.create(newUser);
    }
}

module.exports = new AuthService();
