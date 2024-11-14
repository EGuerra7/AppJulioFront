import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = "http://localhost:8080/usuario"

  constructor(private http: HttpClient) { }

  listarIndividual(usuario: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + "/" + usuario.id);
  }

  listarUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API);
  }
}
