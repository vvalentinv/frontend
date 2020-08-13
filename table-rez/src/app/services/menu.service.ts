import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

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
  getMenu(id:number){
    return this.request('GET',`${environment.serverUrl}/menu/${id}`);
  }
  getAllMenus() {
    return this.request('GET', `${environment.serverUrl}/menu`);
  }
  addMenu(menu){
    return this.request('POST',`${environment.serverUrl}/menu`,menu);
  }
  updateMenu(menu) {
    return this.request('PUT', `${environment.serverUrl}/menu/${menu.menuID}`, menu);
  }
}


