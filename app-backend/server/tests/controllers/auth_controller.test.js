const request = require('supertest');
const app = require('../../app');

test('Debe registrar un usuario', async () => {
    const res = await request(app)
        .post('/api/v1/users/register')
        .send({
            username: 'pepito',
            email: 'pepit@gmail.com',
            password: '12345',
            role: ''
        })
        .set('Accept', 'application/json'); // <-- Aseguro que el request es JSON válido

    console.log('Respuesta del servidor:', res.body); // <-- Verifico qué devuelve el servidor
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
});

test('Debe loguear un usuario y devolver un token', async () => {
    const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: 'pepit@gmail.com',
            password: '12345'
        })
        .set('Accept', 'application/json');

    console.log('Respuesta del servidor:', res.body); // <-- Verifico qué devuelve el servidor
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
});