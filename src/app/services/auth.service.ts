import { UserService } from './user.service';
import { AppUSer } from './../models/app-users';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {  switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Don;t make it as Observale<firebase.default.User | null > Later you'll get null point error
  user$!: Observable<any>;
  // Activated Route: get the current url
  constructor(
    private afAuth: AngularFireAuth,
    private route:ActivatedRoute,
    private userService:UserService,
    )
  { // set the firebase.default.user type to the user observable   
    this.user$= afAuth.authState
  }

  login() {
    // After login go the return url or home page
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new  firebase.default.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

  // change the firebase user type to AppUSer type (so can get the isAdmin attribute)
  get appUSer$() : Observable<AppUSer>{
    return this.user$
    .pipe(
        switchMap(user =>  {
          if(user) return this.userService.get(user.uid);
        // otherwise can;t loge out always there will be some annonymous user
         return of(null);
        }))
  }
}
