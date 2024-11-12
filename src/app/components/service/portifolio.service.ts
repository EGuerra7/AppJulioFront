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
}
