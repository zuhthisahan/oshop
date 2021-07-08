import { OrderService } from './../../services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent{

  orders$ !: any;
  constructor(private orderService: OrderService) { 
    this.orders$= this.orderService.getOrders().valueChanges();
  }
}
