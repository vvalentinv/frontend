import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

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
  getAllItems() {
    return this.request('GET', `${environment.serverUrl}/item`);
  }
  getItem(id:number){
    return this.request('GET',`${environment.serverUrl}/item/${id}`);
  }
  getItembyRestaurant(id:number){
    return this.request('GET',`${environment.serverUrl}/restaurantitem/${id}`);
  }
  addItem(item){
    return this.request('POST',`${environment.serverUrl}/item`,item);
  }
  updateItem(item) {
    return this.request('PUT', `${environment.serverUrl}/item/${item.itemID}`, item);
  }
}


