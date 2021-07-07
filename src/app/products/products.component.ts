import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Products } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{
  products: Products[] =[];
  filteredProducts: Products[] =[]
  category!: string|null
  cart: any;
  subscription!: Subscription

  constructor(
    productService:ProductService,
    route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService
    ) { 

   

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
async ngOnInit(){
 this.subscription= (await this.shoppingCartService.getCart()).subscribe(cart=>this.cart=cart);
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
