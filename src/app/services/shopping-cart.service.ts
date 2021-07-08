import { ShoppingCart } from './../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Products } from './../models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>  {
    let cartId= await this.getOrCreateCartId()
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(
      map((s:any)=> new ShoppingCart(s?.items))
    );
  }

  //no need async
  async addToCart(product:Products){
    this.updateItem(product,1)
   }

 //no need async
 async removeFromCart(product: Products) {
    this.updateItem(product,-1)
  }


  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove(); 
  }

   
  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId 
    // get the results of a promise without using then method, 
    // get the result like a synchronized method usin async fun 
    let result:any = await this.create()
    localStorage.setItem('cartId', result.key);   
    return result.key  
  }

  private getItem(cartId: string, productId?:string ){
    return this.db.object('/shopping-cart/' + cartId + '/items/' +productId )
  }
  
  private async updateItem(product: Products, change:number){
    let cartId = await this.getOrCreateCartId(); // promise to observable
    let item$ = this.getItem(cartId, product.id)
    // item$.valueChanges().subscribe(i=> console.log(i))
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      // No need of if else statement
      let quantity = (item?.quantity || 0) + change 
      if(quantity === 0) item$.remove();
      else item$.update({
          //v1 : don;t add under the product
          // product: product,
          title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,
          quantity: quantity
        });
    });
  }
  
}

