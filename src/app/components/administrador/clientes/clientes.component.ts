import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  usuarios: Usuario[] = []

  constructor ( private usuarioService: UsuarioService ) {}
  ngOnInit(){
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(response => {
      this.usuarios = response;
    }, error => {
      console.log("Erro ao encontrar os usuários!");
    })

  }

}
