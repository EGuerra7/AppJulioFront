import { PortifolioService } from './../service/portifolio.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Portifolio } from '../model/portifolio.model';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements	OnInit{
  images$ = new BehaviorSubject<{ src: string }[]>([]);
  fotosWeb: Portifolio[] = [];

  constructor(public portifolioService: PortifolioService) {}

  async ngOnInit() {
    await this.loadImages();
  }

  async loadImages() {
    this.portifolioService.listarFotos().subscribe(
      (response) => {
        this.fotosWeb = response;

        const shuffledImages = this.fotosWeb
          .map((foto) => ({
            src: `https://i.ibb.co/${foto.url}`,
          }))
          .sort(() => Math.random() - 0.5);

        this.images$.next(shuffledImages); // Atualiza o Observable

        this.initScrollReveal();
      },
      (error) => {
        console.log('Erro ao carregar as URLs: ' + error);
      }
    );
  }

  async initScrollReveal() {
    if (typeof window !== 'undefined') {
      const ScrollReveal = (await import('scrollreveal')).default;
  
      const sr = ScrollReveal({
        distance: '20px',
        duration: 1000,
      });
  
      sr.reveal('.image', { origin: 'left', interval: 600, delay: 300});
    }
  }
}
