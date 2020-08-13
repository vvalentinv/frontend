import { Component, OnInit,Input } from '@angular/core';
import {RestaurantItem} from '../models/restaurantItemModel';
import {ItemService} from '../services/item.service';
import {SectionService} from '../services/section.service';
import {ManagerService } from '../services/manager.service';
import {ActivatedRoute, Params, Router, NavigationExtras} from '@angular/router';
import {FormBuilder, FormGroup, Validators,EmailValidator, ControlContainer} from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @Input() restaurantitems: any[]=[];
  @Input() sections: any[]=[];
  @Input() managers: any[]=[];
  addItemForm:FormGroup;
  selectedSection: string;
  restaurantID: number;
  selectedManager:any={id:null,firstName:'', lastName:'',phone:'',email:'', restaurantID:null, body:'', header:'', image:'', addressID:null, description:'',post_code:'', provinceCode:'',country:''};

  constructor( private itemService:ItemService, private sectionService:SectionService, private route: ActivatedRoute,private managerService: ManagerService,
    private router: Router, private formBuilder:FormBuilder) {
      this.route.queryParams.subscribe(params=>{
      this.restaurantID=params.rest_id;
      this.selectedManager.email=params.manager_email;
    })
    }

  ngOnInit() {
    this.pickManager(this.selectedManager.email);
    this.getItembyRestaurant(this.restaurantID);
    this.getSection(this.restaurantID);

    this.addItemForm=this.formBuilder.group({
      itemName:['',Validators.required],
      itemDescription:['',Validators.required],
      measurementUnit:['',Validators.required],
      size:['',Validators.required],
      itemPrice:['',Validators.required],
      sectionID:['',Validators.required]
    });

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

  private getItembyRestaurant(id:number){
    this.itemService.getItembyRestaurant(id).then((response:any)=>{
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

  private getSection(id:number){
    this.sectionService.getSection(id).then((response:any)=>{
      this.sections=response.map((section)=>{
        section.id=section.sectionID;
        section.name=section.sectionName;
        return section;
      })
    })
  }

  createItem() {
    const newItem = {
      itemName: this.addItemForm.get('itemName').value,
      itemDescription: this.addItemForm.get('itemDescription').value,
      measurementUnit: this.addItemForm.get('measurementUnit').value,
      size: this.addItemForm.get('size').value,
      itemPrice: this.addItemForm.get('itemPrice').value,
      sectionID: this.addItemForm.get('sectionID').value,
  };
  this.itemService.addItem(newItem);

  let navigationExtras: NavigationExtras={
    queryParams:{
      manager_email:this.selectedManager.email,
    }
  }
  this.router.navigate(['/managerRes'],navigationExtras);
  }
}
