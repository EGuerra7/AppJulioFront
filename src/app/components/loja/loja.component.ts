import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Cupom } from '../model/cupom.model';
import { CupomService } from '../service/cupom.service';
import { LoginService } from '../service/login.service';
import { UsuarioService } from '../service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmaComponent } from '../shared/popup-confirma/popup-confirma.component';


@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent {

  usuario: any;
  cupons: Cupom[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private cupomService: CupomService, private loginService: LoginService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.buscarCupons();
    this.buscarUsuario();
  }

  buscarUsuario() {
    const usuarioLogin = this.loginService.obterUsuario();

    if (usuarioLogin && usuarioLogin.id) {
      this.usuarioService.listarIndividual(usuarioLogin).subscribe(
        (response) => {
          this.usuario = response;
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      );
    } else {
      console.error('Usuário de login não encontrado ou ID não definido');
    }
  }

  buscarCupons() {
    this.cupomService.listarCupons().subscribe(response => {
      this.cupons = response;
      const dataAtual = new Date();
      this.cupons = this.cupons.filter(cupom => new Date(cupom.dataValidade!) >= new Date(dataAtual));
    }, error => {
      console.log("Erro ao encontrar os usuários!");
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
