import { Products } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
    items: ShoppingCartItem[] =[]

    // directly initilaize the itemMaps field
    constructor(private itemsMap:{[productId:string]: ShoppingCartItem}) {
        this. itemsMap = itemsMap || {}
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            // let x = new ShoppingCartItem();
            // Object.assign(x,item);
            // x.id=productId;

            this.items.push(new ShoppingCartItem({
                ...item,
                id:productId
            }));
        }
           
    }

    getQuantity(product:Products) {
        let item = this.itemsMap[product.id]
        return item ? item.quantity : 0; 
      }

    get totalPrice(){
        let total=0;
        for(let productId in this.items)
            total += this.items[productId].totalPrice;
        return total;
    }

    get totalItemsCount() {
        let count =0;
        for(let productId in this.itemsMap)
            count +=  this.itemsMap[productId].quantity;
        return count;
    }
}