import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

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
  getAllBookings() {
    return this.request('GET', `${environment.serverUrl}/booking`);
  }
  getBooking(id:number){
    return this.request('GET',`${environment.serverUrl}/booking/${id}`);
  }
  addBooking(booking){
    return this.request('POST',`${environment.serverUrl}/booking`,booking);
  }
  updateBooking(booking) {
    return this.request('PUT', `${environment.serverUrl}/booking/${booking.bookingID}`, booking);
  }
}


