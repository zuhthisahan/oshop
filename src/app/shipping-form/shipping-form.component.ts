import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart !: ShoppingCart;
  shipping = {} as any;
  userId!: string;
  userSubcription!: Subscription;
  

  constructor(
    private router:Router,
    private orderService:OrderService,
    private authService:AuthService) { }

  ngOnInit() {
    this.userSubcription= this.authService.user$.subscribe(user=> this.userId=user.uid);
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result =await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
