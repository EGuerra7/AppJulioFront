import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../model/usuario.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompraCupomService } from '../../service/compra-cupom.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FotosService } from '../../service/fotos.service';
import { Foto } from '../../model/foto.model';
import { Cupom } from '../../model/cupom.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup-confirma',
  standalone: true,
  imports: [MatDialogActions, CommonModule, ReactiveFormsModule],
  templateUrl: './popup-confirma.component.html',
  styleUrl: './popup-confirma.component.css',
  providers: [DatePipe]
})
export class PopupConfirmaComponent implements OnInit {

  fotos: Foto[] = [];
  fotosSemCupom: Foto[] = [];

  compra!: FormGroup;

  isCompra!: boolean;
  isCupom!: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupConfirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: string, item?: any, usuarioData?: Usuario },
    private compraService: CompraCupomService,
    private fotoService: FotosService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.isCompra = this.data.tipo === "Compra";
    this.isCupom = this.data.tipo === "Cupom";

    this.compra = new FormGroup({
      usuario: new FormControl(data.usuarioData, Validators.required),
      cupom: new FormControl(data.item, Validators.required),
      status: new FormControl(true)
    })
  }
  ngOnInit(): void {
    this.buscarFotosIndividual();
  }

  buscarFotosIndividual() {
    const cupom: Cupom = this.data.item;

    console.log();

    if (this.data.usuarioData) {
      this.fotoService.listarFotosIndividuais(this.data.usuarioData).subscribe(
        (response) => {
          this.fotos = response;

          this.fotos.forEach(foto => {
            foto.horaFormatada = this.formatarHoras(foto.horario!);
          });

          this.fotosSemCupom = this.fotos.filter(foto =>
            !foto.usoCupom && foto.valorRestante! >= cupom.valor!
          );

        },
        (error) => {
          console.error("Erro ao carregar as fotos: " + error);
        }
      );
    } else {
      console.error("Usuário não encontrado ou ID inválido.");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  comprar() {
    const compraData = this.compra.value;

    if (this.compra.valid) {
      this.compraService.comprarCupom(compraData).subscribe(response => {
        if (response == true) {
          this.showSuccess("Cupom Comprado!")
          this.dialogRef.close;
        } else {
          this.showError("Clicks Insuficientes!")
          this.dialogRef.close;
        }

      }, () => {
        this.showError("Erro de informações!");
      })
    } else {
      this.showError("Erro ao executar a Compra!");
    }
  }

  usar(foto: Foto) {
    const compraData = this.compra.value;

    if (this.compra.valid) {
      this.compraService.usoCupom(compraData, foto).subscribe(response => {
        if (response == true) {
          this.showSuccess("Cupom Usado")
          this.dialogRef.close;
        } else {
          this.showError("Cupom Inválido");
          this.dialogRef.close;
        }

      }, () => {
        this.showError("Erro ao usar o cupom");
      })
    } else {
      this.showError("Erro de informações ao executar a Compra!");
    }
  }



  formatarHoras(hora: string): string {
    // Formatar cada foto com a hora formatada
    // Cria uma data fictícia, onde a data é irrelevante e só a hora importa
    const horarioDate = new Date(`1970-01-01T${hora}`);

    // Agora o DatePipe consegue formatar a hora
    return this.datePipe.transform(horarioDate, 'HH:mm') || '';
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}
