import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,

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
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      role: [''] // Por defecto, el rol no es necesario
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }

    this.authService.register(this.formulario.value).subscribe(
      user => {
        Swal.fire({
          icon: 'success',
          title: '¡Registrado exitosamente!',
          text: 'Ahora puedes iniciar sesión con tu cuenta.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error => {
        // Aquí puedes manejar los errores si es necesario
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema con el registro. Intenta nuevamente.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      }
    );
  }
}
