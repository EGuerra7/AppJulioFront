import { PortifolioService } from './../service/portifolio.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Portifolio } from '../model/portifolio.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements	OnInit{
  images: { src: string; }[] = [];
  fotosWeb: Portifolio[] = [];

  constructor(public portifolioService: PortifolioService){}

  ngOnInit() {
    this.loadImages();
  }


  loadImages() {

    this.portifolioService.listarFotos().subscribe(
      (response) => {
        this.fotosWeb = response;

        this.images = this.fotosWeb
          .map((foto) => ({
            src: `https://i.ibb.co/${foto.url}` //
          }))
          .sort(() => Math.random() - 0.5);
      },
      (error) => {
        console.log("Erro ao carregar as URLs: " + error);
      }
    );
  }
}
