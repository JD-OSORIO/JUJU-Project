import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {

  book = signal<any>({})
  books: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private booksService: BooksService,
              public authService: AuthService,
              private router: Router
  ){}

  ngOnInit() {
    this.DetailsBooks()
  }

  DetailsBooks(){
    this.activatedRoute.params.subscribe(params =>{
      this.booksService.getById(params['bookID']).subscribe(book =>{

        // Verifica si tiene userId y lo asigna
        this.book.set({ ...book, userId: book.userId || book.owner || null });

      }, error =>{
        console.error(' Error al obtener el libro', error);
      });
    });
  }

  onClickBorrar(bookId: string): void {
    this.booksService.delete(bookId).subscribe(() => {
      /*Este filtro es el que se encarga de mostrar solo los libros
      Del dueño que tiene iniciada la sesion, por lo tanto aunque le aparezcan
      No lo va a dejar por las peticiones del back */
      this.books = this.books.filter(book => book._id !== bookId);
      this.router.navigate(['/books'])
    });
  }


}
