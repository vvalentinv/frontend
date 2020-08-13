import { Component, OnInit, Input } from '@angular/core';
import{ActivatedRoute,Router, NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import { response } from 'express';
import{UserByEmailService} from '../services/user-by-email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 check=true;
 main=false;
  customer;
  id;
  loginForm:FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  user:any;
  selectedUser={id:null,firstName:'',lastName:''}
@Input() usersByEmail:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private customerService: CustomerService,
    private userByEmailService:UserByEmailService
  ) { }

   ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  //  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }
storeInfo(){
  this.check=!this.check
  this.main=!this.main
  this.customerService.loginUser(this.loginForm.get('email').value, this.loginForm.get('password').value)
this.userByEmailService.getUserByEmail(this.loginForm.get('email').value)
.then((response:any)=>{
  console.log(this.loginForm.get('email').value)
 this.usersByEmail=response.map((loginUser)=>{
  // if(this.custArray.indexOf(loginUser.userID))
//this.custArray.push(loginUser.userID)
   this.selectedUser.id=loginUser.userID;
   return loginUser;
 })

})
}
 login(id){

/*.then( (res:Response) => {
  let body=res
  this.customer=body;
  return body ||{};
});*/

  let navigationExtras: NavigationExtras={
    queryParams:{
    //user_email:this.loginForm.get('email').value,
    user_id:id
    }
  }

  this.router.navigate(['/customerPage'],navigationExtras)
};
}
