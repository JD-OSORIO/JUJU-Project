const BookService = require('../../services/book_service');
const BookRepository = require('../../repositories/bookRepository');
require('../setup');

describe('BookService Tests', () => {
    let bookId;
    let userId = '65b7e1234567890abcdef012'; // Simulación de un userId

    beforeEach(async () => {
        const book = await BookService.createBook({
            title: 'Libro de prueba',
            author: 'Autor de prueba',
            yearPublished: 2024
        }, userId);

        bookId = book._id;
    });

    test('Debe obtener todos los libros del usuario', async () => {
        const books = await BookService.getAllBooks(userId);
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBeGreaterThan(0);
    });

    test('Debe obtener un libro por ID', async () => {
        const book = await BookService.getBookById(bookId, userId);
        expect(book).toHaveProperty('title', 'Libro de prueba');
    });
});