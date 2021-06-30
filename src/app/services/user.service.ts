import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:  AngularFireDatabase) {}

  // Add user to firebase DB
  save(user : firebase.default.User){
    this.db.object('/users/' + user.uid).update({
      name:user.displayName,
      email: user.email
    })
  }
  // Get a user
  get(uid : string): Observable<any>{
       return this.db.object('/users/'+ uid).valueChanges();
  }
}
