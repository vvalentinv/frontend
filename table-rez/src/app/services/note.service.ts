import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  getAllNotes() {
    return this.request('GET', `${environment.serverUrl}/note/`);
  }
  getNote(id:number) {
    return this.request('GET', `${environment.serverUrl}/note/${id}`);
  }
  addNote(note){
    return this.request('POST',`${environment.serverUrl}/note`,note);
  }
  updateNote(id:number, value:any) {
    return this.request('PUT', `${environment.serverUrl}/note/${id}`, value);
  }
  getCustomerNote(id:number){
    return this.request('GET', `${environment.serverUrl}/notecustomer/${id}`);
  }
  deleteNote(id:number){
    return this.request('DELETE', `${environment.serverUrl}/note/${id}`);
}
}

