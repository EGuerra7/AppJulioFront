import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PopupComponent } from '../../shared/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PortifolioService } from '../../service/portifolio.service';
import { Portifolio } from '../../model/portifolio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{

  fotos: Portifolio[] = [];
  images: { id: number, url: string ,src: string; }[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private portifolioService: PortifolioService){}
  ngOnInit(): void {
    this.buscarPort();
  }

  openDialog(tipo: string, item?: any, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '99%',
      data: { tipo, item, isEdit: !!item  },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarPort();
    });
  }

  buscarPort(){
    this.portifolioService.listarFotos().subscribe(response => {
      this.fotos = response;
      
      this.images = this.fotos
          .map((foto) => ({
            id: foto.id!,
            url: foto.url!,
            src: `https://i.ibb.co/${foto.url}`
          }))
    }, erro => {
      console.log(erro);
    })
  }

  openRegisterDialog(tipo: string): void {
    this.openDialog(tipo);
  }

  deletarFoto(foto: Portifolio){
this.portifolioService.deletarFoto(foto).subscribe(response => {
  if(response = true){
    alert("Foto deletada com sucesso!");
    this.buscarPort();
  } else {
    alert("Erro ao deletar!");
  }
})
  }
}
