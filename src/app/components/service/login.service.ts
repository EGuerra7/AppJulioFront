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

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  private readonly API = "http://localhost:8080/usuario/login"

  constructor(private http: HttpClient, private router: Router) {
    this.carregarUsuarioLocal();
   }

  public login(usuario: LoginReponse): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  logout() {
    this.usuarioSubject.next(null);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('usuario');
    }

    this.router.navigate(['/login']);
  }

  salvarUsuario(usuario: Usuario) {
    this.usuarioSubject.next(usuario);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  obterUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  private carregarUsuarioLocal() {
    if (typeof window !== 'undefined' && localStorage) {
      const usuarioString = localStorage.getItem('usuario');
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        this.usuarioSubject.next(usuario);
      }
    }
  }


  isLoggedIn(): boolean {
    return this.obterUsuario() !== null;
  }

  getPermissao() {
    const usuario = this.obterUsuario();
    return usuario ? usuario.permissao : null;
  }
}
