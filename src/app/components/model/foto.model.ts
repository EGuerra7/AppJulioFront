import { Usuario } from './usuario.model';


export class Foto{
  id?: number;
  data?: string;
  horario?: string;
  horaFormatada?: string;
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
  usoCupom?: boolean;
}
