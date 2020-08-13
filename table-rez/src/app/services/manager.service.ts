import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ManagerService {

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
  getAllManagers() {
    return this.request('GET', `${environment.serverUrl}/manager`);
  }
  getManagerbyEmail(email:string){
    return this.request('GET', `${environment.serverUrl}/manageremail/${email}`);
  }
  getManagerbySectionEmail(email:string){
    return this.request('GET', `${environment.serverUrl}/managersection/${email}`);
  }
  getManagerItembyEmail(email:string){
    return this.request('GET', `${environment.serverUrl}/manageritem/${email}`);
  }
  getManager(id:number){
    return this.request('GET',`${environment.serverUrl}/manager/${id}`);
  }
  createManager(manager){
    return this.request('POST',`${environment.serverUrl}/manager`,manager);
  }
  updateManager(manager) {
    return this.request('PUT', `${environment.serverUrl}/manager/${manager.managerID}`, manager);
  }
  loginManager(email,password){
    return this.request('POST', `${environment.serverUrl}/login-manager`,{email,password});
  }
}
