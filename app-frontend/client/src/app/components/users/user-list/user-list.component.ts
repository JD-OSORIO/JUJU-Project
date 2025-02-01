import { Component, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

    users: any[] = [];
    currentUserEmail: string = '';
    user = signal<any>({})

    constructor(private userService: UsersService, public authService: AuthService) {}

    ngOnInit(): void {
      this.getAndFilterUsers()
    }

  getAndFilterUsers(){
    const currentUser = this.authService.getUser(); // Obtengo el usuario actual
    this.userService.getAll().subscribe(data => {
    /*Utilizo este filtro para no mostra al usuario authenticado aun que en el back
    ya esto esta validado es mejor visualmente ponerlo */
    this.users = data.filter((user:any) => user._id !== currentUser.id);

    }, error => {
      console.error(' Error cargando usuarios', error);
    });
  }

onClickBorrar(userId: string): void {
  this.userService.delete(userId).subscribe(() => {
    this.users = this.users.filter(user => user._id !== userId);
  }, error => {
    console.error('Error al eliminar usuario', error);
  });
}
}
