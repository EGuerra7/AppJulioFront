import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusTrabalho } from '../model/statusTrabalho.model';
import { Foto } from '../model/foto.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private readonly API = "http://localhost:8080/foto"

  constructor(private http: HttpClient) { }

  public gerarFoto(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(this.API, foto);
  }

  public editarFoto(foto: Foto): Observable<Foto> {
    return this.http.put<Foto>(this.API, foto);
  }

  public listarFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.API);
  }


  public listarFotosIndividuais(usuario: Usuario): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.API + "/" + usuario.id);
  }

  public statusTrabalho(usuarioId: number): Observable<StatusTrabalho> {
    return this.http.get<StatusTrabalho>(this.API + "/status/" + usuarioId);
  }
}
