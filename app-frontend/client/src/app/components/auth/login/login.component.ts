import { AuthService } from '../../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario: FormGroup;

  //Iyeccion de servicios y implementos de angular

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit(){
    this.authService.login(this.formulario.value).subscribe(data=>{
      if(!data.error){
        //Guarda el token
        localStorage.setItem('token_books',data.token);
        this.router.navigate(['/books'])
      }
    })

  }

}
