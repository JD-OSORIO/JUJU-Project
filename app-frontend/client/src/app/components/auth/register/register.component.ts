import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ){
    this.formulario = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(4)]] ,
      email: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.min(6), Validators.max(50)]],
      //El rol no es requerido ya que solo se requiere cuando se va a crear un rol administrador
      //Por defecto esta como usuario (regular)
      role:  ['']
    })
  }


  onSubmit(){

    this.authService.register(this.formulario.value).subscribe(user=>{
      console.log('Registrado')
      this.router.navigate(['/login'])

    })

  }

}
