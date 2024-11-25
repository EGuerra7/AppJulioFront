import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cupom } from '../model/cupom.model';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private readonly API = "https://appjulio.onrender.com/cupom";

  constructor(private http: HttpClient) { }

  public criarCupom(cupom: Cupom): Observable<Cupom> {
    return this.http.post<Cupom>(this.API, cupom);
  }

  public listarCupons(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(this.API);
  }

  public ContagemCuponsInd(usuario: Usuario): Observable<number> {
    return this.http.get<number>(this.API + "/" + usuario.id);
  }

  public editarCupom(cupom: Cupom): Observable<Cupom> {
    return this.http.put<Cupom>(this.API, cupom);
  }
}
