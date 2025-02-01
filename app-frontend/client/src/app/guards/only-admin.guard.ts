import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class OnlyAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();

    /*Sencillo si no es admin retorna un false dejandolo en su pagina principal de notas */

    if (!user || user.role !== "admin") {
      this.router.navigate(["/books"]);
      return false;
    }

    return true; // Permito el acceso a administradores
  }
}
