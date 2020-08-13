import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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
  getUser() {
    return this.request('GET', `${environment.serverUrl}/user`);
  }

  createUser(user) {
    return this.request('POST', `${environment.serverUrl}/user`, user);
  }

  updateUser(id:number, value:any) {
    return this.request('PUT', `${environment.serverUrl}/user/${id}`, value);
  }
  loginUser(email,password){
    return this.request('POST', `${environment.serverUrl}/login`,{email,password});
  }

  getUserById(id){
    return this.request('GET', `${environment.serverUrl}/user/${id}`,id);
  }
}
