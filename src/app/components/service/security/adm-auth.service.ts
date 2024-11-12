import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Injectable({
  providedIn: 'root'
})
export class AdmAuthService {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getPermissao() === 'Administrador') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
