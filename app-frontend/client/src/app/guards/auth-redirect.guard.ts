import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    /*Se encargar de dirigir a la ruta principal si el usuario esta logeado
    permitiendo de esta manera que el usuario no pueda acceder a la ruta
    de registro o de logeo */
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
