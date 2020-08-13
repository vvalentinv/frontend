import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

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
  getAllOwners() {
    return this.request('GET', `${environment.serverUrl}/owner`);
  }
  getOwner(id:number){
    return this.request('GET',`${environment.serverUrl}/owner/${id}`);
  }
  createOwner(owner){
    return this.request('POST',`${environment.serverUrl}/owner`,owner);
  }
  updateOwner(owner) {
    return this.request('PUT', `${environment.serverUrl}/owner/${owner.ownerID}`, owner);
  }
  loginOwner(email,password){
    return this.request('POST', `${environment.serverUrl}/login-manager`,{email,password});
  }
}


