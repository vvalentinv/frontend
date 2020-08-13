import { Component, OnInit,Input } from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
import{Router, NavigationExtras} from '@angular/router';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-restaurant-cards',
  templateUrl: './restaurant-cards.component.html',
  styleUrls: ['./restaurant-cards.component.css']
})
export class RestaurantCardsComponent implements OnInit {
  searchText: string;
  @Input() restaurants: any[]=[];
  @Input() addresses: any[]=[];
  selectedAddress: any={id:null,description:'',post_code:''}
  selectedRestaurant: any={id:null,name:'',email:''};


  constructor(private restaurantService:RestaurantService,
    private addressService:AddressService,
    private router:Router) { }
  ngOnInit() {
    this.getRestaurants();
  }
navigate(id,name){
  let navigationExtras: NavigationExtras={
    queryParams:{
      rest_id:id,
      rest_name:name
    }
  }
  this.router.navigate(['singlerestaurant'],navigationExtras);
}
  private getRestaurants(){
    this.restaurantService.getRestaurants().then((response:any)=>{
      this.restaurants=response.map((restaurant)=>{
        restaurant.body=restaurant.email;
        restaurant.header=restaurant.name;
        restaurant.image=restaurant.restaurant_image;
        restaurant.id=restaurant.restaurantID;
        restaurant.addressID=restaurant.addressID;
        this.addressService.getAddress(restaurant.addressID).then((response:any)=>{
          this.addresses=response.map((address)=>{
            address.description=address.addressDescription;
            address.post_code=address.postalCode;
            address.id=address.addressID;
            return address;
          })
        })
        return restaurant;
      })
    })
  }

}
