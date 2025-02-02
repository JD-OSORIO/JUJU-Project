import  Swal  from 'sweetalert2';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }

    this.authService.login(this.formulario.value).subscribe(
      data => {
        if (!data.error) {
          localStorage.setItem('token_books', data.token);
          this.router.navigate(['/books']);
        } else {
          this.showErrorAlert('Correo o contraseña incorrectos.');
        }
      },
      (error: HttpErrorResponse) => {
        // Comprobamos si el error es un 400 Bad Request (credenciales incorrectas)
        if (error.status === 400) {
          this.showErrorAlert('Correo o contraseña incorrectos.');
        } else {
          // Si es otro tipo de error, mostramos un mensaje general
          this.showErrorAlert('Hubo un problema con el inicio de sesión. Intente nuevamente.');
        }
      }
    );
  }

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#d33'
    }).then(() => {
      this.formulario.reset(); // Limpia el formulario después de mostrar la alerta
    });
  }
}
