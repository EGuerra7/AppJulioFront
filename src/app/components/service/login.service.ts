import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReponse } from '../model/login.model';
import { Usuario } from '../model/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$: Observable<any> = this.usuarioSubject.asObservable();
  private readonly API = "http://localhost:8080/usuario/login"

  constructor(private http: HttpClient, private router: Router) { }

  public login(usuario: LoginReponse): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  logout() {
    this.usuarioSubject.next(null)
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  salvarUsuario(usuario: Usuario) {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obterUsuario(): Usuario | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioJson = localStorage.getItem('usuario');
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    }
    return null;
  }

  obterUsuarioAtual(): any {
    return this.usuarioSubject.value;
  }

  isLoggedIn(): boolean {
    return this.obterUsuario() !== null;
  }

  getPermissao() {
    const usuario = this.obterUsuario();
    return usuario ? usuario.permissao : null;
  }
}
