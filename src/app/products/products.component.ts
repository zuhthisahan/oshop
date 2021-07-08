import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Products } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Products[] =[];
  filteredProducts: Products[] =[]
  category!: string|null
  cart$!: Observable<ShoppingCart>;
  

  constructor(
    private productService:ProductService,
   private route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService
    ) {  }
async ngOnInit(){
  this.cart$= (await this.shoppingCartService.getCart());
  this.popualteProducts();
}

// Populate products
private popualteProducts() {
  this.productService
  .getAll().pipe(
    switchMap(products =>{
      this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params=>{
    this.category = params.get('category');
    this.applyFilter();
   });
}

// filter according to category 
private applyFilter() {
  this.filteredProducts = (this.category) ?
  this.products.filter(p => p.category===this.category) :
  this.products  
}

}
