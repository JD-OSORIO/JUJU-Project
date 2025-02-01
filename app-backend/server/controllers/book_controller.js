const bookService = require ('../services/book_service')

class BookController {
  async getAll(req, res, next) {
    try {
      /*En esto obtengo solo los libros del usuario autenticado para evitar acceso indebido a datos de otros usuarios.*/
      const books = await bookService.getAllBooks(req.user.user_id);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      /* Me aseguro de que el usuario solo pueda acceder a libros que le pertenecen*/
      const book = await bookService.getBookById(req.params.bookID, req.user.user_id);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // Asocio automáticamente el libro al usuario autenticado.
      const book = await bookService.createBook(req.body, req.user.user_id);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      // Garantizo que solo el dueño del libro pueda actualizarlo.
      const book = await bookService.updateBook(req.params.bookID, req.user.user_id, req.body);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      // Impido que el usuario elimine libros que no le pertenecen.
      const book = await bookService.deleteBook(req.params.bookID, req.user.user_id);
      if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

      res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();