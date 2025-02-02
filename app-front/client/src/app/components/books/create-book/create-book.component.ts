import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../../services/books.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-book',
  standalone: false,

  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  // Método que se llama cuando el formulario se envía
  onSubmit() {
    this.booksService.create(this.formulario.value).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Libro Creado!',
        text: 'El libro se ha creado exitosamente.',
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        this.router.navigate(['/books']);
      }, 3000);
    });
  }
}
