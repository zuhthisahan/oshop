import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) { }

  // Rolebase Admin RouteGuard
  canActivate(){
     return this.auth.appUSer$.pipe(map(appUser => appUser.isAdmin))      
}
}
// this.auth.user$
//     .pipe(
//         switchMap(user => 
//          this.userService.get(user.uid)), 
//          map(appUser => appUser.isAdmin)
//     ).subscribe(u=>console.log(u))