import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder,
              private booksService: BooksService,
              private router: Router
  ){
    this.formulario = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]] ,
      author: ['',[Validators.required]],
      yearPublished: ['',[Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      bookStatus:  [null,[Validators.required]]
    });
  }

  onSubmit(){
    this.booksService.create(this.formulario.value).subscribe(data=>{
      this.router.navigate(['/books'])
    }
    )
  }

}
