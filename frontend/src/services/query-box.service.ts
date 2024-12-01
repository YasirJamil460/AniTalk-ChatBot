import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chat } from '../models/chat.type';

@Injectable({
  providedIn: 'root'
})
export class QueryBoxService {

  private http = inject(HttpClient)
  private sendQueryToServer = 'http://localhost:5000/user-query'
  private responseFromServer = 'http://localhost:5000/response'
  
  sendPrompt(query: string) {
    return this.http.post(this.sendQueryToServer, {message: query});
  }

  getResponse() {
    return this.http.get<Array<Chat>>(this.responseFromServer)
  }
}
