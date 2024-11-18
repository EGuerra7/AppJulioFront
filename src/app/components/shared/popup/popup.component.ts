import { Usuario } from './../../model/usuario.model';
import { UsuarioService } from './../../service/usuario.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Foto } from '../../model/foto.model';
import { FotosService } from '../../service/fotos.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogActions, CommonModule, MatIconModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  usuarioForm!: FormGroup;
  fotoForm!: FormGroup;

  isCliente!: boolean;
  isFoto!: boolean;


  constructor(private usuarioService: UsuarioService,
    private fotoService: FotosService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: string, item?: any, isEdit: boolean },
  ) {

    this.isCliente = this.data.tipo === 'Cliente';
    this.isFoto = this.data.tipo === 'Foto';

    const item = this.data.item || {};

    this.usuarioForm = new FormGroup({
      nome: new FormControl(this.isCliente ? item.nome || "" : "", Validators.required),
      apelido: new FormControl(this.isCliente ? item.apelido || "" : "", Validators.required),
      senha: new FormControl(this.isCliente ? item.senha || "" : "", Validators.required),
      dataAniversario: new FormControl(this.isCliente ? this.converterParaFormatoDdMmYyyy(item.dataAniversario) || "" : "", Validators.required),
      clicks: new FormControl(this.isCliente ? item.clicks || 0 : 0),
      permissao: new FormControl(this.isCliente ? item.permissao || null : null, Validators.required)
    })

    this.fotoForm = new FormGroup({
      usuario: new FormControl(
        this.isFoto && item.usuario 
          ? this.listUsuarios.find(usuario => usuario.id === item.usuario.id) 
          : null,
        Validators.required
      ),
      data: new FormControl(this.isFoto ? this.converterParaFormatoDdMmYyyy(item.data) || "" : "", Validators.required),
      horario: new FormControl(this.isFoto ? item.horario || "" : "", Validators.required),
      local: new FormControl(this.isFoto ? item.local || "" : "", Validators.required),
      tipo: new FormControl(this.isFoto ? item.tipo || null : null, Validators.required),
      valorTotal: new FormControl(this.isFoto ? item.valorTotal || null : null, Validators.required),
      valorPago: new FormControl(this.isFoto ? item.valorPago || null : null),
      descricaoPagamento: new FormControl(this.isFoto ? item.descricaoPagamento || "" : "", Validators.required),
      status: new FormControl(this.isFoto ? item.status || "" : "", Validators.required),
      linkFoto: new FormControl(this.isFoto ? item.linkFoto || "" : ""),
      click: new FormControl(this.isFoto ? item.click || null : null, Validators.required)
    })

  }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  initializeForm(): void {
    const item = this.data.item || {};
  
    this.fotoForm = new FormGroup({
      usuario: new FormControl(
        this.isFoto && item.usuario
          ? this.listUsuarios.find(usuario => usuario.id === item.usuario.id)
          : null,
        Validators.required
      ),
      data: new FormControl(this.isFoto ? this.converterParaFormatoDdMmYyyy(item.data) || "" : "", Validators.required),
      horario: new FormControl(this.isFoto ? item.horario || "" : "", Validators.required),
      local: new FormControl(this.isFoto ? item.local || "" : "", Validators.required),
      tipo: new FormControl(this.isFoto ? item.tipo || null : null, Validators.required),
      valorTotal: new FormControl(this.isFoto ? item.valorTotal || null : null, Validators.required),
      valorPago: new FormControl(this.isFoto ? item.valorPago || null : null),
      descricaoPagamento: new FormControl(this.isFoto ? item.descricaoPagamento || "" : "", Validators.required),
      status: new FormControl(this.isFoto ? item.status || "" : "", Validators.required),
      linkFoto: new FormControl(this.isFoto ? item.linkFoto || "" : ""),
      click: new FormControl(this.isFoto ? item.click || null : null, Validators.required)
    });
  }

  buscarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(response => {
      this.listUsuarios = response;
      this.initializeForm();
    }, error => {
      console.log("Erro ao encontrar os usuários!");
    })
  }





  cadastrar() {
    if (this.data.tipo === "Cliente") {
      if (this.usuarioForm.valid) {
        const cliente: Usuario = this.usuarioForm.value;
        const dataFormatada = this.converterDataParaFormatoBackend(cliente.dataAniversario!);

        const dadosParaEnviar = {
          ...cliente,
          dataAniversario: dataFormatada
        };

        if (this.data.isEdit) {
          // Edição de usuário
          const dadosComId = {
            ...dadosParaEnviar,
            id: this.data.item.id
          };

          this.usuarioService.editarUsuario(dadosComId).subscribe(() => {
            alert("Usuário " + cliente.nome + " editado!");
            this.dialogRef.close();
          }, erro => {
            alert("Erro ao editar! " + erro);
          });
        } else {
          // Cadastro de usuário
          this.usuarioService.cadastrarUsuario(dadosParaEnviar).subscribe(response => {
            alert("Usuário cadastrado com sucesso!");
            this.dialogRef.close();
          }, erro => {
            alert("Erro! " + erro);
          });
        }
      } else {
        alert("Cadastre todos os itens necessários!");
      }
    } else if (this.data.tipo === "Foto") {
      if (this.fotoForm.valid) {
        const foto: Foto = this.fotoForm.value;
        const dataFormatada = this.converterDataParaFormatoBackend(foto.data!);
        const horaFormatada = this.adicionarSegundos(foto.horario!);

        const dadosParaEnviar = {
          ...foto,
          data: dataFormatada,
          horario: horaFormatada
        };

        if (this.data.isEdit) {
          // Edição de usuário
          const dadosComId = {
            ...dadosParaEnviar,
            id: this.data.item.id
          };

          this.fotoService.editarFoto(dadosComId).subscribe(() => {
            alert("Foto alterada com sucesso!");
            this.dialogRef.close();
          }, erro => {
            alert("erro!");
          })
        } else {
          this.fotoService.gerarFoto(dadosParaEnviar).subscribe(() => {
            alert("Foto gerada com sucesso");
            this.dialogRef.close();
          }, error => {
            console.log("Erro!" + JSON.stringify(error));
          });
        }
      } else {
        alert("Insira todos os itens necessários!");
      }
    }

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  converterParaFormatoDdMmYyyy(data: string | Date): string {
    if (!data) return '';

    // Se for uma string, tente convertê-la para um objeto Date
    const dataObj = typeof data === 'string' ? new Date(data + 'T00:00:00') : data;

    if (isNaN(dataObj.getTime())) {
      console.error('Data inválida:', data);
      return '';
    }

    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  adicionarSegundos(horario: string): string {
    if (horario.split(":").length === 3) {
      return horario;
    }

    // Adiciona os segundos
    return horario + ":00";
  }

  converterDataParaFormatoBackend(data: string): string {
    // Supondo que a data está no formato "dd/MM/yyyy"
    const partes = data.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    // Reformatar para "yyyy-MM-dd"
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
}
