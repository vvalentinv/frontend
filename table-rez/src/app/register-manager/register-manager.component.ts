import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ManagerService} from '../services/manager.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent implements OnInit {

  registerForm:FormGroup;
  currentManager: any = {id: null, firstName: '', lastName: '', phone:'',email:'',password:''};
  
  constructor(
    private formBuilder:FormBuilder,
    private managerService:ManagerService) { } 

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
    createManager() {
      const newManager = {
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
      phone: this.registerForm.get('phone').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };
    this.managerService.createManager(newManager);
    }
  }
  
  function matchingFields(field1,field2){
    return registerForm => {
      if(registerForm.controls[field1].value !== registerForm.controls[field2].value)
      return {mismatchedFields:true}
    }
  }
  