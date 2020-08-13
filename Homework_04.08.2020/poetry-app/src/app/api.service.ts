import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private URL = 'https://poetrydb.org/author';

  public getAuthors(): Observable<object> {
    return this.httpClient.get(this.URL);
  }

  public getRandomPoem(author: string): Observable<object> {
    return this.httpClient.get(`${this.URL}/${author}`);
  }
}
