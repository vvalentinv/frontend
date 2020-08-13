import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL='<server>/auth'

  constructor(private http:HttpClient) { }
  register(user){
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe()
  }
}
