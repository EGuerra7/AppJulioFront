import { Component, inject, OnInit } from '@angular/core';
import { Cupom } from '../../model/cupom.model';
import { LoginService } from '../../service/login.service';
import { UsuarioService } from '../../service/usuario.service';
import { CompraCupomService } from '../../service/compra-cupom.service';
import { response } from 'express';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmaComponent } from '../../shared/popup-confirma/popup-confirma.component';

@Component({
  selector: 'app-cupons-individual',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, MatIconModule],
  templateUrl: './cupons-individual.component.html',
  styleUrl: './cupons-individual.component.css'
})
export class CuponsIndividualComponent implements OnInit{

  usuario: any;
  cupons: Cupom[] = [];
  cuponsValidos: Cupom [] = [];

  readonly dialog = inject(MatDialog);

  constructor(private compraCupomService: CompraCupomService, private loginService: LoginService, private usuarioService: UsuarioService){}
  ngOnInit(): void {
    this.buscar();
  }

  buscar(){
    const usuarioLogin = this.loginService.obterUsuario();

    if (usuarioLogin && usuarioLogin.id) {
      this.usuarioService.listarIndividual(usuarioLogin).subscribe(
          (response) => {
              this.usuario = response;

              if (this.usuario && this.usuario.id) {         
                  this.cuponsInd();
              }
          }, () => {
            alert("Erro!");
          });
    }
  }


  cuponsInd(){
    this.compraCupomService.listarCuponsInd(this.usuario).subscribe(response => {
      this.cupons = response;
      const dataAtual = new Date();
      this.cuponsValidos = this.cupons.filter(cupom =>new Date(cupom.dataValidade!) >= new Date(dataAtual))
    }, () => {
      alert("Erro!");
    })
  }

  openDialog(item?: any, tipo?: string): void {
    const usuarioData = this.usuario;

    const dialogRef = this.dialog.open(PopupConfirmaComponent, {
      width: '99%',
      data: { tipo, item, usuarioData },
    });

  }
}

  

