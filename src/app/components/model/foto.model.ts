import { Usuario } from './usuario.model';
import { Time } from "@angular/common";

export class Foto{
  id?: number;
  data?: Date;
  horario?: Time;
  local?: string;
  tipo?: string;
  valorTotal?: number;
  valorPago?: number;
  valorRestante?: number;
  descricaoPagamento?: string;
  usuario?: Usuario;
  status?: string;
  linkFoto?: string;
  click?: number;
}
