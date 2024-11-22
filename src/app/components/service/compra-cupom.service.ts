import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Cupom } from '../model/cupom.model';
import { CompraCupom } from '../model/compra.model';
import { Foto } from '../model/foto.model';

@Injectable({
  providedIn: 'root'
})
export class CompraCupomService {

  private readonly API = "http://localhost:8080/compraCupom";

  constructor(private http: HttpClient) { }

  comprarCupom(compra: CompraCupom):Observable<boolean>{
    return this.http.post<boolean>(this.API, compra);
  }

  usoCupom(compra: CompraCupom, foto: Foto): Observable<boolean>{
    return this.http.post<boolean>(this.API + '/uso/' + foto.id, compra);
  }

  listarCuponsInd(usuario: Usuario): Observable<Cupom[]>{
    return this.http.get<Cupom[]>(this.API + "/" + usuario.id);
  }
}
