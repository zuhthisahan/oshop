import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent{
  @Input('product') product!: Products;
  @Input('show-actions') showActions = true
  @Input('shopping-cart') shoppingCart: any;
  constructor(private ShoppingCartService: ShoppingCartService) { }


  addToCart(){
   this.ShoppingCartService.addToCart(this.product)
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.id]
    return item ? item.quantity : 0;
    
  }

  removeFromCard(){
    this.ShoppingCartService.removeFromCart(this.product);
  }
}
