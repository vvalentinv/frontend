import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ManagerService} from '../services/manager.service';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent implements OnInit {
  loginForm:FormGroup;
  public loginInvalid: boolean;
    private formSubmitAttempt: boolean;
    private returnUrl: string;
    user:any;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http:HttpClient,
      private managerService: ManagerService
    ) { }

     ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
      });
    //  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    }

   login(){
    let navigationExtras: NavigationExtras={
      queryParams:{
        manager_email:this.loginForm.get('email').value,
      }
    };
  this.managerService.loginManager(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then(()=>this.router.navigate(['/managerRes'],navigationExtras))

  };
  }
