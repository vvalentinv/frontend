import { Component, OnInit, Input } from '@angular/core';
import {RestaurantService} from '../services/restaurant.service';
import {ActivatedRoute, Params, Router, NavigationExtras} from '@angular/router';
import{Restaurant} from '../models/restaurant';
import { AddressService } from '../services/address.service';
import{MenuService} from '../services/menu.service';
import{SectionService} from '../services/section.service';
import{ItemService} from '../services/item.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  date;
  time;
  range: any[]=[];
  registerForm:FormGroup;
  rangeReverse: any[]=[];
  today=new Date();
  tomorrow=new Date(this.today.setDate(this.today.getDate()+1))
  isShow=true;
  reserve=true;

 selectedRestaurant:any={id:null,name:'',email:'',desc:'',img:''};
 selectedAddress:any={id:null, description:'',post_code:''};
 selectedMenu:any={id:null,name:''};
 selectedSection:any={id:null,name:''};
 selectedItem:any={id:null,name:'', description:'',measurement:'',size:'',price:''};
 @Input() restaurants: any[]=[];
 @Input() addresses: any[]=[];
 @Input() menus: any[]=[];
 @Input() sections: any[]=[];
 @Input() items: any[]=[];

 displayedColumns = [ 'name', 'description', 'unit','size','price'];
  formBuilder: any;
 constructor(private restaurantService:RestaurantService,
  private addressService:AddressService,
  private menuService:MenuService,
  private sectionService:SectionService,
  private itemService:ItemService,
  private router:Router,
    private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params=>{
       this.selectedRestaurant.id=params.rest_id;
      })

    }

  ngOnInit(): void {
      this.pickRestaurant(this.selectedRestaurant.id);
  }

  private pickRestaurant(id){

    this.restaurantService.getOneRestaurant(id).then((response:any)=>{
      this.restaurants=response.map((restaurant)=>{
        this.selectedRestaurant.desc=restaurant.restaurant_desc;
        this.selectedRestaurant.name=restaurant.name;
        this.selectedRestaurant.email=restaurant.email;
        this.selectedRestaurant.img=restaurant.restaurant_image;
        this.addressService.getAddress(restaurant.addressID).then((response:any)=>{
          this.addresses=response.map((address)=>{
            this.selectedAddress.description=address.addressDescription;
            this.selectedAddress.post_code=address.postalCode;
            return address
          })

        })
return restaurant;
    })
      })
    }

    displayMenu(){
this.menuService.getMenu(this.selectedRestaurant.id).then((response:any)=>{
  this.menus=response.map((menu)=>{
    this.selectedMenu.name=menu.menuName;
    this.sectionService.getSection(menu.menuID).then((response:any)=>{
      this.sections=response.map((section)=>{
        section.name=section.sectionName;
        section.id=section.sectionID;
    return section;
      })
    })
      })
    })
      this.isShow=!this.isShow;
      this.reserve=true;
    }

    displayItem(id){
      this.itemService.getItem(id).then((response:any)=>{
        this.items=response.map((item)=>{
       return item;
      })
    })
    }
    reserveTable(){
    const day=new Date();
      this.reserve=!this.reserve;
      if (this.today.getHours()<=17){
        day.setHours(17);
        console.log(day)
        if(this.today.getMinutes()>0&&this.today.getMinutes()<30){
          day.setMinutes(30)
        }
        if(this.today.getMinutes()>30){
          day.setMinutes(0)
        }
      }
      if (this.today.getHours()>17){
        day.setHours(this.today.getHours())
      if(this.today.getMinutes()>0&&this.today.getMinutes()<30){
          day.setMinutes(30)
        }
        if(this.today.getMinutes()>30){
          day.setMinutes(0)

        }
      }
      for(let i=day.getHours();i<24;i++){
        console.log(day)
        if(this.range.indexOf(i)===-1){
        this.range.push(day.getHours()+':'+day.getMinutes());
        day.setMinutes(day.getMinutes()+30)
       }
      }
       this.rangeReverse=this.range.slice().reverse();
       console.log(JSON.stringify(this.rangeReverse))
       this.isShow=true;
    }
    navigate(id,bookTime){
      let navigationExtras: NavigationExtras={
        queryParams:{
          rest_id:id,
          rest_time:bookTime
        }
      }
      this.router.navigate(['reservation'],navigationExtras);
    }

}
