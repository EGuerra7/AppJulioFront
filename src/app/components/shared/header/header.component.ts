
import { CommonModule } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario!: any;

  constructor(private loginService: LoginService){}

  ngOnInit() {
    this.loginService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }



  fecharMenu(){
    const menu = document.getElementById('menu') as HTMLElement;
    const overlay = document.getElementById('overlay') as HTMLElement;
    overlay.style.display = "none";
    menu.classList.remove('animacaoAbrirv');
    menu.classList.add('animacaoFechar');
    setTimeout(() => {
      menu.style.display = "none";
    }, 190);
  }


  abrirMenu(){
    const menu = document.getElementById('menu') as HTMLElement;
    const overlay = document.getElementById('overlay') as HTMLElement;

    overlay.style.display = "block";
    menu.style.display = "flex";
    menu.classList.remove('animacaoFechar');
    menu.classList.add('animacaoAbrir');
    };

}
