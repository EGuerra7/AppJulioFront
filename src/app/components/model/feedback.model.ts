import { Usuario } from "./usuario.model";

export class Feedback{
    id?: number;
    cliente?: Usuario;
    texto?: string;
    nota?: number;
    data?: string;
    ativo?: boolean;
}