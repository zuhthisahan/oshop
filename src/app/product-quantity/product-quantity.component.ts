import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product!: Products;
  @Input('shopping-cart') shoppingCart: any;
  constructor(private shoppingCartService:ShoppingCartService) { }


  addToCart(){
   this.shoppingCartService.addToCart(this.product)
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.id]
    return item ? item.quantity : 0; 
  }

  removeFromCard(){
    this.shoppingCartService.removeFromCart(this.product);
  }
}

