import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent{
  @Input('product') product!: Products;
  @Input('show-actions') showActions =true
  constructor() { }



}
