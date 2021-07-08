export class ShoppingCartItem {
    // V1
    // product!: Products;
    // quantity!: number;

    // V3
    id! : string;
    title!: string;
    imageUrl! : string;
    price! : number;
    quantity! : number

    // constructor(public product: Products, public quantity:number){}

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }
    get totalPrice() {return this.price * this.quantity}
} 