import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { DetailsBookComponent } from './components/books/details-book/details-book.component';
import { CreateBookComponent } from './components/books/create-book/create-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MenuComponent } from './components/ui/menu/menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    DetailsBookComponent,
    CreateBookComponent,
    EditBookComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    UserListComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
