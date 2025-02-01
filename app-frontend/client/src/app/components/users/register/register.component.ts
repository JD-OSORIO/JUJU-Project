import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService
  ){
    this.formulario = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(4)]] ,
      email: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.min(6), Validators.max(50)]],
      role:  ['',[Validators.required]]
    })
  }


  onSubmit(){

    this.authService.register(this.formulario.value).subscribe(user=>{
      console.log(user)
    })

  }

}
