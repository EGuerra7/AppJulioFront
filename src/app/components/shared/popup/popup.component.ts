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
import { CupomService } from '../../service/cupom.service';
import { Cupom } from '../../model/cupom.model';

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
  cupomForm!: FormGroup;

  isCliente!: boolean;
  isFoto!: boolean;
  isCupom!: boolean;


  constructor(private usuarioService: UsuarioService,
    private fotoService: FotosService,
    private cupomService: CupomService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: string, item?: any, isEdit: boolean },
  ) {

    this.isCliente = this.data.tipo === 'Cliente';
    this.isFoto = this.data.tipo === 'Foto';
    this.isCupom = this.data.tipo === 'Cupom';

    const item = this.data.item || {};

    this.usuarioForm = new FormGroup({
      nome: new FormControl(this.isCliente ? item.nome || "" : "", Validators.required),
      apelido: new FormControl(this.isCliente ? item.apelido || "" : "", Validators.required),
      senha: new FormControl(this.isCliente ? item.senha || "" : "", Validators.required),
      dataAniversario: new FormControl(this.isCliente ? this.converterParaFormatoDdMmYyyy(item.dataAniversario) || "" : "", Validators.required),
      clicks: new FormControl(this.isCliente ? item.clicks || 0 : 0),
      telefone: new FormControl(this.isCliente ? item.telefone || "" : ""),
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
      click: new FormControl(this.isFoto ? item.click || null : null, Validators.required),
      usoCupom: new FormControl(this.isFoto ? item.usoCupom || false : false)
    })

    this.cupomForm = new FormGroup({
      nome: new FormControl(this.isCupom ? item.nome || "" : "", Validators.required),
      valor: new FormControl(this.isCupom ? item.valor || null : null, Validators.required),
      valorClick: new FormControl(this.isCupom ? item.valorClick || null : null, Validators.required),
      dataValidade: new FormControl(this.isCupom ? this.converterParaFormatoDdMmYyyy(item.dataValidade) || "" : "", Validators.required)
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
      this.criarCliente();

     } else if (this.data.tipo === "Foto") {
      this.criarFoto();

      } else if(this.data.tipo === "Cupom"){
        this.criarCupom();

      } else {
        alert("Insira todos os itens necessários!");
      }
    }


  criarCliente(){
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
  }


  criarFoto(){
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
        }, () => {
          alert("erro!");
        })
      } else {
        this.fotoService.gerarFoto(dadosParaEnviar).subscribe(() => {
          alert("Foto gerada com sucesso");
          this.dialogRef.close();
        }, error => {
          console.log("Erro!" + JSON.stringify(error));
        });
  }}}

  criarCupom(){
    if (this.cupomForm.valid) {
      const cupom: Cupom = this.cupomForm.value;
      const dataFormatada = this.converterDataParaFormatoBackend(cupom.dataValidade!);

      const dadosParaEnviar = {
        ...cupom,
        dataValidade: dataFormatada
      };

      if (this.data.isEdit) {
        // Edição de usuário
        const dadosComId = {
          ...dadosParaEnviar,
          id: this.data.item.id
        };

        this.cupomService.editarCupom(dadosComId).subscribe(() => {
          alert("Cupom alterado com sucesso!");
          this.dialogRef.close();
        }, () => {
          alert("erro!");
        })
      } else {
        this.cupomService.criarCupom(dadosParaEnviar).subscribe(() => {
          alert("Cupom gerado com sucesso");
          this.dialogRef.close();
        }, error => {
          console.log("Erro!" + JSON.stringify(error));
        });
  }}
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
