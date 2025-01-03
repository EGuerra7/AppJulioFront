import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly API = "http://localhost:8080/feedback"

  constructor(private http: HttpClient) { }

  public salvarFeed(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.API, feedback)
  }

  public listarFeeds(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.API);
  }

  public ativarFeed(feedback: Feedback): Observable<Feedback> {

    return this.http.put(this.API + "/" + feedback.id, { ativo: feedback.ativo });
  }



}
