import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent{
  @Input('product') product!: Products;
  @Input('show-actions') showActions = true
  @Input('shopping-cart') shoppingCart!: ShoppingCart;
  constructor(private ShoppingCartService: ShoppingCartService) { }

  addToCart(){
   this.ShoppingCartService.addToCart(this.product)
  }



}
