import { Component, OnInit,Input } from '@angular/core';
import {SectionModel} from '../models/sectionModel';
import {SectionService} from '../services/section.service';
import {ItemService} from '../services/item.service';
import {ManagerService } from '../services/manager.service';
import {ActivatedRoute,Router,NavigationExtras} from '@angular/router';
import {FormBuilder, FormGroup, Validators,EmailValidator, ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-add-menusection',
  templateUrl: './add-menusection.component.html',
  styleUrls: ['./add-menusection.component.css']
})
export class AddMenusectionComponent implements OnInit {

  @Input() sections: any[]=[];
  @Input() items: any[]=[];
  @Input() managers: any[]=[];
  addSectionForm:FormGroup;
  restaurantID: number;
  selectedManager:any={id:null,firstName:'', lastName:'',phone:'',email:'', restaurantID:null, body:'', header:'', image:'', addressID:null, description:'',post_code:'', provinceCode:'',country:''};


  constructor(private sectionService:SectionService, private itemService:ItemService, private route: ActivatedRoute, private managerService: ManagerService,
    private router: Router, private formBuilder:FormBuilder) {
      this.route.queryParams.subscribe(params=>{
      this.restaurantID=params.rest_id;
      this.selectedManager.email=params.manager_email;
    })
    }

  ngOnInit() {
    this.pickManager(this.selectedManager.email);
    this.getSection(this.restaurantID);

    this.addSectionForm=this.formBuilder.group({
      sectionName:['',Validators.required],
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

  private getSection(id:number){
    this.sectionService.getSection(id).then((response:any)=>{
      this.sections=response.map((section)=>{
        section.id=section.sectionID;
        section.name=section.sectionName;
        this.itemService.getItem(section.sectionID).then((response:any)=>{
          this.items=response.map((item)=>{
            item.id=item.itemID;
            item.name=item.itemName;
            item.desc=item.itemDescription;
            item.unit=item.measurementUnit;
            item.size=item.size;
            item.price=item.itemPrice;
            return item;
          })
        })
        return section;
      })
    })
  }

  createSection() {
    const newSection = {
      sectionName: this.addSectionForm.get('sectionName').value,
      menuID: this.restaurantID
  };
  this.sectionService.addSection(newSection);

  let navigationExtras: NavigationExtras={
    queryParams:{
      manager_email:this.selectedManager.email,
    }
  }
  this.router.navigate(['/managerRes'],navigationExtras);
  }

}
