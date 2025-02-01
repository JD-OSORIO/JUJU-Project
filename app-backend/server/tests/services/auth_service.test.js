const AuthService = require('../../services/auth_service');
const UserRepository = require('../../repositories/userRepository');
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');
require('../setup');

describe('AuthService Tests', () => {
    beforeEach(async () => {
        await UserRepository.create({
            username: 'testuser',
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 12)
        });
    });

    test('Debe fallar al iniciar sesión con credenciales incorrectas', async () => {
        await expect(AuthService.login('test@example.com', 'wrongpassword'))
            .rejects
            .toThrow(AppError);
    });

    test('Debe registrar un nuevo usuario', async () => {
        const newUser = await AuthService.createUser({
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123'
        });

        expect(newUser).toHaveProperty('_id');
    });
});