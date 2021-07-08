import { switchMap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {

  orders$!: any;
  constructor(
    orderService:OrderService,
    authService:AuthService
    ) {
   
      this.orders$ = authService.user$.pipe(switchMap((u) => orderService.getOrderByUser(u.uid).valueChanges()))
      this.orders$.subscribe((u:any)=>console.log(u))
      
   }

 
}
