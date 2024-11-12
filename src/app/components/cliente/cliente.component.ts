import { Component, OnInit } from '@angular/core';

import { LoginService } from '../service/login.service';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusTrabalho } from '../model/statusTrabalho.model';
import { FotosService } from '../service/fotos.service';
import { Foto } from '../model/foto.model';
import { ProgressBarComponent } from "../shared/progress-bar/progress-bar.component";
import { UsuarioService } from '../service/usuario.service';




@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [DatePipe, CommonModule, ProgressBarComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  usuario: any;
  trabalhos!: StatusTrabalho;
  diasRestantes!: number;

  fotos: Foto[] = [];
  fotosAgendadas: Foto[] = [];
  fotosEmAndamento: Foto[] = [];
  fotosConcluidas: Foto[] = [];

  constructor(private loginService: LoginService, private fotosService: FotosService, private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.buscarUsuario();
    if (this.usuario && this.usuario.dataAniversario) {
      this.calcularDiasRestantes(this.usuario.dataAniversario);
    }

  }

  buscarUsuario() {
    const usuarioLogin = this.loginService.obterUsuario();

    if (usuarioLogin && usuarioLogin.id) {
      this.usuarioService.listarIndividual(usuarioLogin).subscribe(
        (response) => {
          this.usuario = response;

          if (this.usuario && this.usuario.id) {
            this.buscarFotosIndividual();

            this.fotosService.statusTrabalho(usuarioLogin.id!).subscribe(
              (status: StatusTrabalho) => {
                this.trabalhos = status;
              },
              (error) => {
                console.error('Erro ao obter status do trabalho:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      );
    } else {
      console.error('Usuário de login não encontrado ou ID não definido');
    }
  }


  buscarFotosIndividual() {
    if (this.usuario && this.usuario.id) {
      this.fotosService.listarFotosIndividuais(this.usuario).subscribe(
        (response) => {
          this.fotos = response;

          // Filtra as fotos por status
          this.fotosAgendadas = this.fotos.filter(foto => foto.status === 'Agendado');
          this.fotosEmAndamento = this.fotos.filter(foto => foto.status === 'Em andamento');
          this.fotosConcluidas = this.fotos.filter(foto => foto.status === 'Concluído');
        },
        (error) => {
          console.error("Erro ao carregar as fotos: " + error);
        }
      );
    } else {
      console.error("Usuário não encontrado ou ID inválido.");
    }
  }


  calcularDiasRestantes(dataAniversario: string): void {
    const dataAtual = new Date();
    const aniversario = new Date(dataAniversario);

    aniversario.setFullYear(dataAtual.getFullYear());
    if (aniversario < dataAtual) {
      aniversario.setFullYear(dataAtual.getFullYear() + 1);
    }

    // Calcula a diferença em dias
    const diffTime = aniversario.getTime() - dataAtual.getTime();
    this.diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }


  logout() {
    this.loginService.logout();
  }

}
