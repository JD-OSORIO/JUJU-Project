import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  // searchTerm: any;
  searchTerm: string = ''; 

  constructor(private userService: UsersService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getAndFilterUsers();
  }

  getAndFilterUsers() {
    const currentUser = this.authService.getUser();
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data.filter((user: any) => user._id !== currentUser.id);
      },
      (error) => console.error('Error cargando usuarios', error)
    );
  }

  onClickBorrar(userId: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(userId).subscribe(
          () => {
            this.users = this.users.filter((user) => user._id !== userId);
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');
          },
          (error) => console.error('Error al eliminar usuario', error)
        );
      }
    });
  }

  get filteredUsers() {
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
