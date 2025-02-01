import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router,
              public authService: AuthService
  ){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
