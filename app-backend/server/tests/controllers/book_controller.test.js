const request = require('supertest');
const app = require('../../app');
const Book = require('../../models/book_model');
require('../setup');

describe('BookController Tests', () => {
    let userToken;
    let bookId;

    beforeAll(async () => {
        // Crear usuario de prueba
        await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            })
            .set('Accept', 'application/json');
    
        // Iniciar sesión para obtener el token
        const loginRes = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            })
            .set('Accept', 'application/json');
    
        console.log('Respuesta del login:', loginRes.body); // Depuro
    
        userToken = loginRes.body.token;
    

    });


    test('Debe crear un libro', async () => {
        const res = await request(app)
            .post('/api/v1/books')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                title: 'Libro de prueba',
                author: 'Autor de prueba',
                yearPublished: 2024
            });

        console.log('Respuesta al crear libro:', res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        await new Promise(resolve => setTimeout(resolve, 500));

        bookId = res.body._id;
        console.log(' ID del libro guardado:', bookId);
    });

    test('Debe obtener todos los libros', async () => {

        const res = await request(app)
            .get('/api/v1/books')
            .set('Authorization', `Bearer ${userToken}`);

        console.log('Libros obtenidos:', res.body);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Debe obtener un libro por ID', async () => {
        console.log('Intentando obtener libro con ID:', bookId);

        const res = await request(app)
            .get(`/api/v1/books/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`);

        console.log('Respuesta al obtener libro:', res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('title', 'Libro de prueba');
    });

    test('Debe eliminar un libro', async () => {
        console.log('Intentando eliminar libro con ID:', bookId);

        const res = await request(app)
            .delete(`/api/v1/books/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`);

        console.log('Respuesta al eliminar libro:', res.body);

        expect(res.statusCode).toBe(200);
    });
});
