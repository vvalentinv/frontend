import { Component, OnInit,Input } from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
import{Router, NavigationExtras} from '@angular/router';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-hero-baner',
  templateUrl: './hero-baner.component.html',
  styleUrls: ['./hero-baner.component.css']
})

export class HeroBanerComponent implements OnInit {
  @Input() restaurants: any[]=[];

  constructor(private restaurantService:RestaurantService,
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
        restaurant.image=restaurant.restaurant_image;
        restaurant.name=restaurant.name;
        restaurant.id=restaurant.restaurantID;
        return restaurant;
      })
    })
  }
}
