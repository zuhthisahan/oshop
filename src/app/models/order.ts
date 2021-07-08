import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaced!: number;
    items : any[] =[]
    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
              prduct: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totlaPrice: i.totalPrice,
            }
          })
    }
}