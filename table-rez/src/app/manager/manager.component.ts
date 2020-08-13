import { Component, OnInit,Input } from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
import {ActivatedRoute, Params, Router, NavigationExtras} from '@angular/router';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @Input() managers: any[]=[];
  @Input() restaurants: any[]=[];
  @Input() restaurantitems: any[]=[];
  @Input() sections: any[]=[];
  selectedManager:any={id:null,firstName:'', lastName:'',phone:'',email:'', restaurantID:null, body:'', header:'', image:'', addressID:null, description:'',post_code:'', provinceCode:'',country:''};

  constructor(private restaurantService:RestaurantService,
    private managerService:ManagerService,
    private route: ActivatedRoute,
    private router:Router) {
      this.route.queryParams.subscribe(params=>{
        this.selectedManager.email=params.manager_email;
  })
    }
  ngOnInit(): void {
    this.pickManager(this.selectedManager.email);
    this.getItembyRestaurant(this.selectedManager.email);
    this.getSection(this.selectedManager.email);
  }

  private pickManager(email:string){
    this.managerService.getManagerbyEmail(email).then((response:any)=>{
      this.managers=response.map((manager)=>{
        this.selectedManager.id = manager.userID;
        this.selectedManager.firstName = manager.firstName;
        this.selectedManager.lastName = manager.lastName;
        this.selectedManager.phone = manager.phone;
        this.selectedManager.restaurantID = manager.restaurantID;
        this.selectedManager.body=manager.restaurant_email;
        this.selectedManager.header=manager.name;
        this.selectedManager.image=manager.restaurant_image;
        this.selectedManager.addressID=manager.addressID;
        this.selectedManager.description=manager.addressDescription;
        this.selectedManager.post_code=manager.postalCode;
        this.selectedManager.provinceCode=manager.provinceCode;
        this.selectedManager.country=manager.country;
        return manager;
      })
    })
  }


  private getItembyRestaurant(email:string){
    this.managerService.getManagerItembyEmail(email).then((response:any)=>{
      this.restaurantitems=response.map((item)=>{
        item.sectionID=item.sectionID;
        item.sectionName= item.sectionName;
        item.id=item.itemID;
        item.name=item.itemName;
        item.desc=item.itemDescription;
        item.unit=item.measurementUnit;
        item.size=item.size;
        item.price=item.itemPrice;
        return item;
      })
    })
  }

  private getSection(email:string){
    this.managerService.getManagerbySectionEmail(email).then((response:any)=>{
      this.sections=response.map((section)=>{
        section.id=section.sectionID;
        section.name=section.sectionName;
        return section;
      })
    })
  }

  addSection(){
    let navigationExtras: NavigationExtras={
      queryParams:{
        rest_id:this.selectedManager.restaurantID,
        manager_email:this.selectedManager.email
      }
    }
    this.router.navigate(['addSection'],navigationExtras);
  }

  addItem(){
    let navigationExtras: NavigationExtras={
      queryParams:{
        rest_id:this.selectedManager.restaurantID,
        manager_email:this.selectedManager.email
      }
    }
    this.router.navigate(['addItem'],navigationExtras);
  }

}
