import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { DetailsBookComponent } from './components/books/details-book/details-book.component';
import { CreateBookComponent } from './components/books/create-book/create-book.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { loginGuard } from './guards/login.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { AdminGuard } from './guards/admin.guard';
import { OnlyAdminGuard } from './guards/only-admin.guard';

const routes: Routes = [
  //Acceso de Users
  { path: 'books', component: BooksListComponent, canActivate: [loginGuard, AdminGuard] },
  { path: 'books/new', component: CreateBookComponent, canActivate: [loginGuard, AdminGuard] },
  { path: 'books/edit/:bookID', component: EditBookComponent, canActivate: [loginGuard, AdminGuard] },
  { path: 'books/:bookID', component: DetailsBookComponent, canActivate: [loginGuard, AdminGuard] },
  //Acceso de Admins
  { path: 'admin', component: UserListComponent, canActivate: [loginGuard, OnlyAdminGuard]},
  { path: 'admin/edit/:userID', component: EditUserComponent, canActivate: [loginGuard, OnlyAdminGuard]},
  //Auth Rutas
  { path: 'register', component: RegisterComponent, canActivate:[AuthRedirectGuard] },
  { path: 'login', component: LoginComponent, canActivate:[AuthRedirectGuard] },
  //Por defecto
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
