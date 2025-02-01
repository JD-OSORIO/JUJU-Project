import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
 formulario: FormGroup;

  userId = signal('');

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private router:Router
  ){

    this.formulario = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(3)]] ,
      password: ['',[Validators.required]],
      role:  ['',[Validators.required]]
    })
  }

  ngOnInit() {
    this.getUserById()
  }

  getUserById(){
    this.activatedRoute.params.subscribe(params => {
      //Este parametro es el que saco y lo pongo a la URL
      this.userService.getById(params['userID']).subscribe(response => {
        console.log('Respuesta del backend:', response);

        const user = response.user; // Aquí extraigo el usuario correctamente

        if (!user) {
          console.error('El usuario es null o undefined');
          return;
        }

        this.userId.set(user._id);

        // Elimina datos que no necesito en el formulario
        delete user._id;
        delete user.__v;
        delete user.password;

        // Uso patchValue aqui para evitar errores si falta algún campo
        this.formulario.patchValue(user);
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    });
  }


  onSubmit() {
    const formData = { ...this.formulario.value };

    // Si el usuario dejó la contraseña vacía, no la enviamos
    if (!formData.password) {
      delete formData.password;
    }

    this.userService.update(this.userId(), formData).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

}

