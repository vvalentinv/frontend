import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostService {

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
  getAllHosts() {
    return this.request('GET', `${environment.serverUrl}/host`);
  }
  getHost(id:number){
    return this.request('GET',`${environment.serverUrl}/host/${id}`);
  }
  addHost(host){
    return this.request('POST',`${environment.serverUrl}/host`,host);
  }
  updateHost(host) {
    return this.request('PUT', `${environment.serverUrl}/host/${host.hostID}`, host);
  }
  loginHost(email,password){
    return this.request('POST', `${environment.serverUrl}/host`,{email,password});
  }
}


