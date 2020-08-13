import { Injectable } from '@angular/core';
import {CustomerService} from './customer.service';
import{RegisterModel} from '../models/register.model';
import { map, filter, switchMap } from 'rxjs/operators';
import {LoginModel} from '../models/loginModel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*  constructor(private customerService:CustomerService) { }
  registerUser(user:RegisterModel){
    this.customerService.post('users/register',user)
    .pipe(map((res:any)=>res.json()));
  }
  authenticatedUser(user:LoginModel){
    this.customerService.post('users/login',user)
    .pipe(map((res:any)=>res.json()));
  }*/
}
