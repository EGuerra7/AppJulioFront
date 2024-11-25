import { Component } from '@angular/core';
import { LoginReponse } from '../model/login.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginReponse = { apelido: '', senha: '' };

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) { }


  login() {
    this.loginService.login(this.loginData).subscribe({
      next: (usuario) => {
        this.loginService.salvarUsuario(usuario);
        let msg = "Bem-vindo, " + usuario.nome;
        this.showSuccess(msg);
        if (usuario.permissao === 'Administrador') {
          this.router.navigate(['/administrador']);
        } else {
          this.router.navigate(['/cliente'], { queryParams: usuario });
        }
      },
      error: (err) => {
        this.showError("Apelido ou senha inválidas");
      },
    });
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Login efetuado!');
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
