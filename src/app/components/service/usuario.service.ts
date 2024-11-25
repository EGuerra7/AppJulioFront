import { Usuario } from './../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = "https://appjulio.onrender.com/usuario"

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.API, usuario);
  }

  listarIndividual(usuario: Usuario): Observable<Usuario> {
    return this.http.get<Usuario>(this.API + "/" + usuario.id);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }
}
