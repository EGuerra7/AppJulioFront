import { Component } from '@angular/core';
import { LoginReponse } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginReponse = { apelido: '', senha: '' };

  constructor(private loginService: LoginService, private router: Router){}


  login() {
    this.loginService.login(this.loginData).subscribe({
      next: (usuario) => {
        this.loginService.salvarUsuario(usuario);
        if (usuario.permissao === 'Administrador') {
          this.router.navigate(['/administrador']);
        } else {
          this.router.navigate(['/cliente'], { queryParams: usuario });
        }
      },
      error: (err) => {
        console.log(JSON.stringify(err));
      },
    });
  }
}
