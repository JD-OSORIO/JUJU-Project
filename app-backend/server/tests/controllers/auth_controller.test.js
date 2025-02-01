const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');
require('../setup');

describe('AuthController Tests', () => {
    let userToken;
    let userId;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: 'jdtuser',
                email: 'jd@example.com',
                password: 'password123',
                role: "admin"
            })
            .set('Accept', 'application/json');
    
        console.log('📌 Usuario de prueba creado:', res.body);
    
        // Iniciar sesión para obtener el token
        const loginRes = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'jd@example.com',
                password: 'password123'
            })
            .set('Accept', 'application/json');
    
        console.log('📌 Respuesta del login:', loginRes.body);

        console.log('📌 Payload del token:', jwt.decode(loginRes.body.token));
    
        userToken = loginRes.body.token;
    });
    

    test('Creo otro usuario de prueba', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: "usuarioEl",
                email: "usuarioEl@gmail.com",
                password: "usuario"
            })
            .set('Accept', 'application/json');
    
        console.log('📌 Respuesta al crear usuario:', res.body);
    
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id'); // Verificar que el ID existe
    
        userId = res.body._id;
        console.log('📌 Nuevo usuario creado con ID:', userId);
    });

test('Debe loguear un usuario y devolver un token', async () => {
    const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'test@example.com',
            password: 'password123'
        })
        .set('Accept', 'application/json');

    console.log('Respuesta del servidor:', res.body); // <-- Verifico qué devuelve el servidor
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
});

test('Debe obtener todos los usuarios', async () => {

    const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`);

    console.log('Usuarios Obtenidos:', res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('Debe obtener un usuario por ID', async () => {
    console.log('Intentando obtener usuario por ID:', userId);

    const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

    console.log('Respuesta al obtener el usuario:', res.body);

    expect(res.statusCode).toBe(200);
  });

  test('Debe eliminar a un usuario', async () => {
    console.log('Intentando eliminar usuario:', userId);

    const res = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

    console.log('Respuesta al eliminar usuario:', res.body);

    expect(res.statusCode).toBe(200);
});
});
