import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {OwnerService} from '../services/owner.service';
import { FormBuilder, FormGroup, Validators,EmailValidator, ControlContainer } from '@angular/forms';
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css']
})
export class RegisterOwnerComponent implements OnInit {

  registerForm:FormGroup;
  passwordCheck=true;
  
  
  currentOwner: any = {id: null, firstName: '', lastName: '', phone:'',email:'',password:''};
    constructor(
      private formBuilder:FormBuilder,
      private ownerService:OwnerService) { }  
  
    ngOnInit() {
      this.registerForm=this.formBuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        phone:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        confirmPassword:['', Validators.required]
      }, {validator:matchingFields('password','confirmPassword')});
      }

    createOwner() {
      const newOwner = {
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
      phone: this.registerForm.get('phone').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };
    this.ownerService.createOwner(newOwner);
    }
  }

  
  
  function matchingFields(field1,field2){
    return registerForm => {
      if(registerForm.controls[field1].value !== registerForm.controls[field2].value)
      return {mismatchedFields:true}
    }
  }