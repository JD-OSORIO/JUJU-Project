import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    /*Obtengo el usuario del token */
    const user = this.authService.getUser();
    /*Valido si el usuario existe */
    if (!user) {
      this.router.navigate(["/login"]);
      return false;
    }
    /* Si es admin no lo deje entrar a las notas*/
    if (user.role === "admin") {
      this.router.navigate(["/admin"]); // Redirigir a admin
      return false;
    }
    /*Si no es admin que permita el acceso a las notas */
    return true;
  }
}
