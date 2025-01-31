const bookService = require ('../services/book_service')

class BookController {
  async getAll(req, res, next) {
    try {
      const books = await bookService.getAllBooks(req.user.user_id);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.bookID, req.user.user_id);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const book = await bookService.createBook(req.body, req.user.user_id);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const book = await bookService.updateBook(req.params.bookID, req.user.user_id, req.body);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const book = await bookService.deleteBook(req.params.bookID, req.user.user_id);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();