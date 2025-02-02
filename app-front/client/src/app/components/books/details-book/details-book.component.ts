import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-book',
  standalone: false,

  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {

  book = signal<any>({}); // Libro actual
  bookst: any[] = []; // Lista de libros (si la usas en el contexto)

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.DetailsBooks();
  }

  // Obtener detalles del libro por su ID
  DetailsBooks() {
    this.activatedRoute.params.subscribe(params => {
      this.booksService.getById(params['bookID']).subscribe(book => {
        // Verifica si tiene userId y lo asigna
        this.book.set({ ...book, userId: book.userId || book.owner || null });
      }, error => {
        console.error('Error al obtener el libro', error);
      });
    });
  }

  // Método para eliminar el libro con confirmación
  onClickBorrar(bookId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(result => {
      if (result.isConfirmed) {
        this.booksService.delete(bookId).subscribe(() => {
          // Filtra y elimina el libro de la lista (si es necesario)
          this.bookst = this.bookst.filter(book => book._id !== bookId);
          this.router.navigate(['/books']);
          Swal.fire('Eliminado!', 'El libro ha sido eliminado.', 'success');
        });
      }
    });
  }

}