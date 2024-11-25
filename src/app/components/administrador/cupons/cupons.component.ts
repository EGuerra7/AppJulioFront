import { Cupom } from './../../model/cupom.model';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CupomService } from '../../service/cupom.service';
import { PopupComponent } from '../../shared/popup/popup.component';

@Component({
  selector: 'app-cupons',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, MatIconModule],
  templateUrl: './cupons.component.html',
  styleUrl: './cupons.component.css'
})
export class CuponsComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  cupons: Cupom[] = [];

  constructor(private cupomService: CupomService) { }

  ngOnInit() {
    this.buscarCupons();
  }

  buscarCupons() {
    this.cupomService.listarCupons().subscribe(response => {
      this.cupons = response;
    }, error => {
      console.log("Erro ao encontrar os usuários!");
    })
  }

  openDialog(tipo: string, item?: any, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '90%',
      data: { tipo, item, isEdit: !!item },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarCupons();
    });
  }

  openRegisterDialog(tipo: string): void {
    this.openDialog(tipo);
  }

}
