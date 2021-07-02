import { Products } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$ !:  Observable<any>;
  product$ !:  Observable<any>;
  product=  {} as any;
  productId : any
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    // Activate Route to read the url parameters
    private route:ActivatedRoute ) {

    
    this.categories$ = this.categoryService.getCategories().snapshotChanges();

    this.productId = this.route.snapshot.paramMap.get('id')
    if(this.productId){
      this.product = this.productService.getById(this.productId).valueChanges().pipe(take(1)).subscribe((c:any) => this.product = c)
      console.log(this.product)
    }else{
      this.product({
        title: "enter",
        price:0,
        category:"ss",
        imageUrl:"ss"
      })
    }  
    
   
   }
 
  ngOnInit(): void {
  }

  save(product:any){
    if(this.productId) this.productService.update(this.productId, product)
    else this.productService.create(product)
 
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;

      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products'])
  
  }
 
}
