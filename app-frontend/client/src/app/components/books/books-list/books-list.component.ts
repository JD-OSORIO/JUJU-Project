import { Component, OnInit, signal } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent{

  books: any[] = [];

  constructor(private booksService: BooksService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks(){
    this.booksService.getAll().subscribe(
      (data) => this.books = data,
      (error) => console.error('Error cargando libros', error)
    );
  }


  onClickBorrar(bookId: string): void {
    this.booksService.delete(bookId).subscribe(() => {
      this.books = this.books.filter(book => book._id !== bookId);
    });
  }
}
