const Book = require('../models/book_model');

/*Hago las peticiones que me ayuda mongoDB para poder hacerlo mejor */

class BookRepository {
    async findAll(userId) {
        return await Book.find({ owner: userId });
    }

    async findById(id, userId) {
        return await Book.findOne({ _id: id, owner: userId });
    }

    async create(bookData) {
        const book = new Book(bookData);
        return await book.save();
    }

    async update(id, userId, bookData) {
        return await Book.findOneAndUpdate({ _id: id, owner: userId }, bookData, { new: true });
    }

    async delete(id, userId) {
        return await Book.findOneAndDelete({ _id: id, owner: userId });
    }
}

module.exports = new BookRepository();