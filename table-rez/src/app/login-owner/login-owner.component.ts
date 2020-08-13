import { Component, OnInit } from '@angular/core';
import{ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {OwnerService} from '../services/owner.service';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  styleUrls: ['./login-owner.component.css']
})
export class LoginOwnerComponent implements OnInit {

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
      private ownerService: OwnerService
    ) { }

     ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.email],
        password: ['', Validators.required]
      });
    //  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    }

   loginOwner(){

  this.ownerService.loginOwner(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then(()=>this.router.navigate(['/']))

  };
  }
