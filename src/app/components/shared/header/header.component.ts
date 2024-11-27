
import { CommonModule } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { UsuarioService } from '../../service/usuario.service';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario: any;

  constructor(private loginService: LoginService, private usuarioService: UsuarioService){}

  ngOnInit() {
    this.loginService.usuario$.subscribe((usuarioLogin) => {
      if (usuarioLogin && usuarioLogin.id) {
        this.usuarioService.listarIndividual(usuarioLogin).subscribe(
          (response) => {
            this.usuario = response;
          },
          (erro) => {
            console.log(erro);
          }
        );
      } else {
        return;
      }
    });
  }



  fecharMenu(){
    const menu = document.getElementById('menu') as HTMLElement;
    const overlay = document.getElementById('overlay') as HTMLElement;
    const links = document.getElementById('menu_mobile') as HTMLElement;
    overlay.style.display = "none";
    links.classList.remove('animacaoAbrirLinks')
    links.classList.add('animacaoFecharLinks')
    menu.classList.remove('animacaoAbrir');
    menu.classList.add('animacaoFechar');
    setTimeout(() => {
      menu.style.display = "none";
    }, 190);
  }


  abrirMenu(){
    const menu = document.getElementById('menu') as HTMLElement;
    const overlay = document.getElementById('overlay') as HTMLElement;
    const links = document.getElementById('menu_mobile') as HTMLElement;

    overlay.style.display = "block";
    menu.style.display = "flex";
    links.classList.add('animacaoAbrirLinks')
    links.classList.remove('animacaoFecharLinks')
    menu.classList.remove('animacaoFechar');
    menu.classList.add('animacaoAbrir');
    };

}
