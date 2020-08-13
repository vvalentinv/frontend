import { Component, OnInit,Input } from '@angular/core';
import {TableSectionService} from '../services/table-section.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator, ControlContainer, FormControl, NgForm } from '@angular/forms';
import {BookingService} from '../services/booking.service';
import {TableService} from '../services/table.service'
import {UserByEmailService} from '../services/user-by-email.service'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {RestaurantService} from '../services/restaurant.service';
import { response } from 'express';
import { Subject } from 'rxjs';

@Component({
  providers: [UserByEmailService,TableService,RestaurantService],
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userPhone;
  userEmail;
  firstFormGroup;
  secondFormGroup;
  maxDate: Date;
  minDate:Date;
  bookingTime;
  dt;
  table=true;
  details=true;
  userId;
  reservationForm:FormGroup;
  @Input() tableSections: any[]=[];
  @Input() tables: any[]=[];
  @Input() userByEmail=new Subject <any>()
  @Input() restaurants: any[]=[];
  selectedRestaurant:any={id:'',name:'',email:'',desc:'',img:''};
  selectedUser:any={id:'',email:''}
  selected;
  restaurantArray;
  constructor(
    private tableService: TableService,
    private tableSectionService:TableSectionService,
    private bookingService: BookingService,
    private formBuilder:FormBuilder,
    private restaurantServices:RestaurantService,
    private userByEmailService:UserByEmailService,
    private route: ActivatedRoute) {
  const currentYear = new Date().getFullYear();
  this.minDate=new Date(currentYear, new Date().getMonth(),new Date().getDate())
  this.maxDate = new Date(currentYear, new Date().getMonth()+1,new Date().getDate());
  this.route.queryParams.subscribe(params=>{
  this.selectedRestaurant.id=params.rest_id;
  this.bookingTime=params.rest_time;
   })
   this.dt = new Date();
  }
  ngOnInit(): void {
    this.reservationForm=this.formBuilder.group({
      restaurantID:[''],
      customerID:[''],
     capacity:[''],
     tableSection:[''],
     email:[''],
     calendarDate:['']
    });
this.displayBookingForm();
}
   createBooking(id) {


var date=new Date();

    const newBooking = {
    restaurantID: this.selectedRestaurant.id,
    wasConsumed:'No',
    time:(this.reservationForm.get('calendarDate').value).toISOString().slice(0,19).replace('T',' '),
    customerID:id
    //email:this.reservationForm.get('email').value
  };
  this.bookingService.addBooking(newBooking);

console.log(date.toISOString().slice(0,19).replace('T',' '));
}
  displayBookingForm(){
    //console.log(this.dt.toISOString())
    this.tableSectionService.getTableSectionsById(this.selectedRestaurant.id).then((response:any)=>{
      this.tableSections=response.map((tableSection)=>{
        this.selected=tableSection.tableSectionName
     return tableSection;
    })
  })
  this.restaurantServices.getOneRestaurant(this.selectedRestaurant.id).then((response:any)=>{
    this.restaurants=response.map((restaurant)=>{
      this.selectedRestaurant.name=restaurant.name;
      return restaurant;
    })
  })
  }
  displayTable(id){
    this.tableService.getTableById(id).then((response:any)=>{
      this.tables=response.map((table)=>{
        console.log(JSON.stringify(table))
        return table;
      })
    })
  }
  getRestaurants(){
    this.restaurantServices.getRestaurants().then((response:any)=>{
      this.restaurants=response.map((restaurant)=>{
        if(this.restaurantArray.id.indexOF(restaurant.restaurantID)===-1){
          this.restaurantArray.push(restaurant)
        }
        return restaurant
      })
    })
  }
  checkCustomer(email){
    this.details=!this.details
    this.userByEmailService.getUserByEmail(email).then((response:any)=>{
      this.userByEmail=response.map((user)=>{
      this.selectedUser.id=user.userID
      return user;
      })
    })
  }
}
