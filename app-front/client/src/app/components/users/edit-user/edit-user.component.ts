import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: false,

  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  formulario: FormGroup;

  userId = signal('');
  email = signal('');

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getById(params['userID']).subscribe(response => {
        const user = response.user;

        if (!user) {
          console.error('El usuario es null o undefined');
          return;
        }

        this.userId.set(user._id);
        this.email.set(user.email);

        delete user._id;
        delete user.__v;
        delete user.password;

        // Usa patchValue para evitar errores si falta algún campo
        this.formulario.patchValue(user);
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    });
  }

  onSubmit() {
    const formData = { ...this.formulario.value };

    if (!formData.password) {
      delete formData.password;
    }


    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.update(this.userId(), formData).subscribe(() => {
          Swal.fire(
            'Actualizado!',
            'El usuario ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['/admin']);
        });
      } else {
        console.log('Acción cancelada');
      }
    });
  }
}
