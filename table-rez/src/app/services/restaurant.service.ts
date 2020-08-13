import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

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
  getRestaurants() {
    return this.request('GET', `${environment.serverUrl}/restaurant`);
  }
  getOneRestaurant(id:number){
    return this.request('GET',`${environment.serverUrl}/restaurant/${id}`);
  }

  addRestaurant(restaurant){
    return this.request('POST',`${environment.serverUrl}/restaurant`,restaurant);
  }
  updateRestaurant(restaurant) {
    return this.request('PUT', `${environment.serverUrl}/restaurant/${restaurant.restaurantID}`, restaurant);
  }
 /* getRestaurantByName(name:string){
    return this.request('GET',`${environment.serverUrl}/restaurant/${name}`);
  }*/
}
