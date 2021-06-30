import { AppUSer } from './../models/app-users';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
appUser!: AppUSer;
  constructor(private auth: AuthService, private router:Router) {
    auth.appUSer$.subscribe(appUser => this.appUser=appUser)
    console.log(this.appUser == undefined)
   }

  logout(){
    this.auth.logout()
    this.router.navigate(['']);
  
  }
}
