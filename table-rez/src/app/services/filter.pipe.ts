import { Pipe, PipeTransform } from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantService} from '../services/restaurant.service';
const { isArray } = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(restaurants: any[], searchText: string): any[] {
    if(!restaurants) return [];
    if(!searchText) return restaurants;
    searchText = searchText.toLowerCase();
    return restaurants.filter(restaurant => 
      restaurant.header.toLowerCase().indexOf(searchText.toLowerCase()) !==-1 || restaurant.body.toLowerCase().indexOf(searchText.toLowerCase()) !==-1);
   }
}