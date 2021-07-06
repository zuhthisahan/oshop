import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  products: Products[] =[];
  filteredProducts: Products[] =[]
 
  category!: string|null

  constructor(
    productService:ProductService,
    route: ActivatedRoute) { 
    productService
    .getAll().pipe(
      switchMap(products =>{
        this.products = products;
        return route.queryParamMap;
      })
    ).subscribe(params=>{
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
       this.products.filter(p => p.category===this.category) :
       this.products  
   });
    
  }



}
