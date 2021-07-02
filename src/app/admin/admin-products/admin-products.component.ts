import { Products } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
    products!:Products[];
    filteredProducts =<any>[];
    constructor(private productService: ProductService) { 
    this.productService.getAll()
        .subscribe(p => this.products =this.filteredProducts = p)
    //  this.products$.subscribe(c=>console.log(c))
    
    }
    

    ngOnInit(): void {
    }
  filter(query:string){
  this.filteredProducts = (query) ?
      this.products.filter((p:any) => p.title.toLowerCase().includes(query.toLocaleLowerCase())) :
      this.products
  }
}
