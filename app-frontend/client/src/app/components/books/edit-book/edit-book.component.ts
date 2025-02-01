import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  formulario: FormGroup;

  bookId = signal('');

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private booksService: BooksService,
              private router:Router
  ){

    this.formulario = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]] ,
      author: ['',[Validators.required]],
      yearPublished: ['',[Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      bookStatus:  [null,[Validators.required]]
    })
  }

  ngOnInit() {
    this.getBookById()
  }

  getBookById(){
    this.activatedRoute.params.subscribe(params =>{
      this.booksService.getById(params['bookID']).subscribe(book =>{
        console.log('Libro recibido:',book)
        this.bookId.set(book._id)
        /*Aqui como obtengo todos los datos para poner en el formulario elimino los que no necesito
        en el formulario como la version y el id de esta manera seteando los valores en los campos*/
        delete book._id
        delete book.__v
        //Seteo los valores
        this.formulario.setValue(book);
      }, error =>{
        console.error('Error al obtener el libro', error);
      });
    })
  }


  onSubmit(){
    this.booksService.update(this.bookId(), this.formulario.value).subscribe(data =>{
      this.router.navigate(['/books'])
    })

  }

}
