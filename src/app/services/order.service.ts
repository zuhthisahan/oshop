import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }
  
  async storeOrder(order:any) {
    let result = await this.db.list('/orders').push(order); 
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrderByUser(userId:string){
    return this.db.list('/orders', 
    ref => ref.orderByChild('userId').equalTo(userId)
    )
  }
}
