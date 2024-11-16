import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../shared/popup/popup.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  usuarios: Usuario[] = []

  constructor ( private usuarioService: UsuarioService ) {}

  ngOnInit(){
    this.buscarUsuarios();
  }

  openDialog(tipo: string, item?: any, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '90%',
      data: { tipo, item, isEdit: !!item  },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buscarUsuarios();
    });
  }

  openRegisterDialog(tipo: string): void {
    this.openDialog(tipo);
  }

  buscarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(response => {
      this.usuarios = response;
    }, error => {
      console.log("Erro ao encontrar os usuários!");
    })

  }

}
