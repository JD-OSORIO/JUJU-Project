const bookRepository = require('../repositories/bookRepository');
const BookFactory = require('../utils/bookFactory');

class BookService {
    async getAllBooks(userId) {
        return await bookRepository.findAll(userId);
    }

    async getBookById(bookID, userId) {
        return await bookRepository.findById(bookID, userId);
    }

    async createBook(bookData, userId) {
        const book = BookFactory.createBook(bookData, userId);
        return await bookRepository.create(book);
    }
    
    async updateBook(bookID, userId, bookData) {
        return await bookRepository.update(bookID, userId, bookData);
    }

    async deleteBook(bookID, userId) {
        return await bookRepository.delete(bookID, userId);
    }
}

module.exports = new BookService();