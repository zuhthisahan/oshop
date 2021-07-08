import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product :any){
    this.db.list('/products').push(product)
  }

  getAll(){
    // this.db.list('/products').snapshotChanges()
    // .pipe(map(action => action.map(a=>console.log(a.payload.val()))))

    return this.db.list('/products').snapshotChanges()
    .pipe(map(action => action
      .map(a => {
          let obj:any = a.payload.val()
          return {
              ...obj,
              id: a.payload.key
          };
      })
  ));
  }

  getById(productId: string){
    return this.db.object('/products/' + productId);
  }
  update(productId:string, product:any){
    return this.db.object('/products/'+ productId).update(product)
  }


  delete(produtId:string){
    return this.db.object('/products/'+ produtId).remove();
  }
}
