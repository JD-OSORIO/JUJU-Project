import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-book',
  standalone: false,

  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  formulario: FormGroup;

  bookId = signal('');

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      yearPublished: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      bookStatus: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.getBookById();
  }

  // Obtener los detalles del libro por su ID
  getBookById() {
    this.activatedRoute.params.subscribe(params => {
      this.booksService.getById(params['bookID']).subscribe(book => {
        console.log('Libro recibido:', book);
        this.bookId.set(book._id);
        delete book._id;
        delete book.__v;
        this.formulario.setValue(book); // Rellenar el formulario con los datos
      }, error => {
        console.error('Error al obtener el libro', error);
      });
    });
  }

  onSubmit() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios realizados en este libro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.booksService.update(this.bookId(), this.formulario.value).subscribe(
          () => {
            Swal.fire({
              title: 'Guardado!',
              text: 'Los cambios han sido guardados correctamente.',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['/books']); // Redirige después de cerrar la alerta
            });
          },
          () => {
            Swal.fire('Error', 'Hubo un problema al guardar los cambios. Intenta nuevamente.', 'error');
          }
        );
      }
    });
  }
}
