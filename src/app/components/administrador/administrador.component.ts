import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  usuario: any;

  constructor(private loginService: LoginService, private usuarioService: UsuarioService){}



  ngOnInit(): void {
    this.buscarUsuario();
  }




  buscarUsuario() {
    const usuarioLogin = this.loginService.obterUsuario();

    if (usuarioLogin && usuarioLogin.id) {
        this.usuarioService.listarIndividual(usuarioLogin!).subscribe(
            (response) => {
                this.usuario = response;

                this.usuario.nomeFormatado = this.formatarNome(this.usuario.nome);
            }, (erro) => {
              console.log(erro);
            });
          } else {
            console.error('Usuário de login não encontrado ou ID não definido');
          }

    }


    formatarNome(nomeCompleto: string): string {
      if (!nomeCompleto) {
        return ""; // Retorna vazio se o nome não for fornecido
      }
  
      const partes = nomeCompleto.trim().split(" ");
      const primeiroNome = partes[0]; // Primeiro nome
      const ultimoSobrenome = partes[partes.length - 1]; // Último sobrenome
  
      return `${primeiroNome} ${ultimoSobrenome}`;
    }

  logout(){
    this.loginService.logout();
  }
}
