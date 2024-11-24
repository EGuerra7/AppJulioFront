import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portifolio } from '../model/portifolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortifolioService {

  private readonly API = "http://localhost:8080/port"

  constructor(private http: HttpClient) { }

  public listarFotos(): Observable<Portifolio[]>{
    return this.http.get<Portifolio[]>(this.API);
  }

  public salvarFoto(foto: Portifolio): Observable<Portifolio>{
    return this.http.post<Portifolio>(this.API, foto);
  }
  
  public editarFoto(foto: Portifolio): Observable<Portifolio>{
    return this.http.put<Portifolio>(this.API, foto);
  }
  
  public deletarFoto(foto: Portifolio): Observable<boolean>{
    return this.http.delete<boolean>(this.API + "/" + foto.id);
  }

}
