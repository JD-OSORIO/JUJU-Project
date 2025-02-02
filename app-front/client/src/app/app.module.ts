import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { CreateBookComponent } from './components/books/create-book/create-book.component';
import { DetailsBookComponent } from './components/books/details-book/details-book.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { MenuComponent } from './components/ui/menu/menu.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './components/home/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    CreateBookComponent,
    DetailsBookComponent,
    EditBookComponent,
    MenuComponent,
    EditUserComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
