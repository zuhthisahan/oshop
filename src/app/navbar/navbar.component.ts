import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUSer } from './../models/app-users';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // define appUSer 
  appUser!: AppUSer;
  cart$ !: Observable<ShoppingCart>

  constructor(
    private auth: AuthService,
    private router:Router,
    private shoppingCartService: ShoppingCartService) { }

  logout(){
    this.auth.logout()
    this.router.navigate(['']);
  
  } 

  async ngOnInit(){
    this.auth.appUSer$.subscribe(appUser => this.appUser=appUser);
    this.cart$= await this.shoppingCartService.getCart();
    
  }
}
