import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PopupComponent } from '../../shared/popup/popup.component';
import { Foto } from '../../model/foto.model';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { FotosService } from '../../service/fotos.service';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule, DatePipe],
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.css',
  providers: [DatePipe]
})
export class FotosComponent implements OnInit{

  fotos: Foto[] = [];
  fotosAgendadas: Foto[] = [];
  fotosEmAndamento: Foto[] = [];
  fotosConcluidas: Foto[] = [];

  readonly dialog = inject(MatDialog);

  constructor (private datePipe: DatePipe, private fotosService: FotosService){}

  ngOnInit(): void {
    this.buscarFotos();
  }


  buscarFotos(){
    this.fotosService.listarFotos().subscribe(response => {
      this.fotos = response;

      this.fotos.forEach(foto => {
        foto.horaFormatada = this.formatarHoras(foto.horario!);
        foto.usuario!.nomeFormatado = this.formatarNome(foto.usuario?.nome ?? "");
      });
      // Filtrando as fotos por status
      this.fotosAgendadas = this.fotos.filter(foto => foto.status === 'Agendado');
      this.fotosEmAndamento = this.fotos.filter(foto => foto.status === 'Em andamento');
      this.fotosConcluidas = this.fotos.filter(foto => foto.status === 'Concluído');
    },
    (error) => {
        console.error("Erro ao carregar as fotos: " + error);
    });
  }

  openDialog(tipo: string, item?: any, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '99%',
      data: { tipo, item, isEdit: !!item  },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarFotos();
    });
  }

  openRegisterDialog(tipo: string): void {
    this.openDialog(tipo);
  }



  formatarHoras(hora: string): string {
    // Formatar cada foto com a hora formatada
     // Cria uma data fictícia, onde a data é irrelevante e só a hora importa
     const horarioDate = new Date(`1970-01-01T${hora}`);

     // Agora o DatePipe consegue formatar a hora
     return this.datePipe.transform(horarioDate, 'HH:mm') || '';
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
