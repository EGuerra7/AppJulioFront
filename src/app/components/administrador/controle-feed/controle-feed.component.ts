import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../service/feedback.service';
import { Feedback } from '../../model/feedback.model';
import { CommonModule, DatePipe } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-controle-feed',
  standalone: true,
  imports: [CommonModule, DatePipe, MatSlideToggleModule],
  templateUrl: './controle-feed.component.html',
  styleUrl: './controle-feed.component.css'
})
export class ControleFeedComponent implements OnInit {

  feedbacks: Feedback[] = [];
  stars = [1, 2, 3, 4, 5];

  constructor(private feedbackService: FeedbackService){}

  ngOnInit(): void {
    this.buscarFeeds();
  }

  buscarFeeds(){
    this.feedbackService.listarFeeds().subscribe(response => {
      this.feedbacks = response;

      this.feedbacks.forEach(feed => {
        if (feed.cliente && feed.cliente.nome) {
          feed.cliente.nomeFormatado = this.formatarNome(feed.cliente.nome);
        }
      });

    }, () => {
      console.log("erro!");
    })
  }


  ativo(feed: Feedback, event: any){
    feed.ativo = event.checked;

    this.feedbackService.ativarFeed(feed).subscribe(() => {
      alert('Status atualizado com sucesso');
    }, error => {
      console.error('Erro ao atualizar o status', error);
    });
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

}
