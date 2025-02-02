import { Component } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-books-list',
  standalone: false,

  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {
  books: any[] = [];
  searchTerm: string = '';

  constructor(private booksService: BooksService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // Método para obtener todos los libros
  getAllBooks() {
    this.booksService.getAll().subscribe(
      (data) => this.books = data,
      (error) => console.error('Error cargando libros', error)
    );
  }

  // Método para filtrar los libros según el término de búsqueda
  get filteredBooks() {
    return this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onClickBorrar(bookId: string): void {
    this.booksService.delete(bookId).subscribe(() => {
      this.books = this.books.filter(book => book._id !== bookId);
    });
  }
}
