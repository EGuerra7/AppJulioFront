import { Cupom } from "./cupom.model";
import { Usuario } from "./usuario.model";

export interface CompraCupomId {
    usuarioId: number;
    cupomId: number;
}

export interface CompraCupom {
    id: CompraCupomId;
    usuario: Usuario;
    cupom: Cupom;   
    status: boolean;   
}