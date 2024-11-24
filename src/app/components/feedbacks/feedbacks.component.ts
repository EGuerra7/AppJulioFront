import { FeedbackService } from './../service/feedback.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Feedback } from '../model/feedback.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../shared/popup/popup.component';
import { LoginService } from '../service/login.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit{

  feedbacks: Feedback[] = [];
  stars = [1, 2, 3, 4, 5];
  usuario: any;

  readonly dialog = inject(MatDialog);

  constructor(private feedbackService: FeedbackService, private loginService: LoginService, private usuarioService: UsuarioService){}
  
  ngOnInit(): void {
    this.buscarFeeds();
  }

  OpenDialog(tipo: string): void {
    const item: any = this.usuario;

    const dialogRef = this.dialog.open(PopupComponent, {
      width: '99%',
      data: { tipo, item },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarFeeds();
    });
  }

  buscarFeeds(){
    this.feedbackService.listarFeeds().subscribe(response => {
      this.feedbacks = response.filter(feed => feed.ativo);

      this.feedbacks.forEach(feed => {
        if (feed.cliente && feed.cliente.nome) {
          feed.cliente.nomeFormatado = this.formatarNome(feed.cliente.nome);
        }
      });

      this.buscarUsuario();
    }, () => {
      console.log("erro!");
    })
  }

  buscarUsuario() {
    const usuarioLogin = this.loginService.obterUsuario();

    if (usuarioLogin && usuarioLogin.id) {
        this.usuarioService.listarIndividual(usuarioLogin!).subscribe(
            (response) => {
                this.usuario = response;
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






}
