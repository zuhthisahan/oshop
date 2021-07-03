import { Products } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products=<any>[];
  displayedColumns: string[] = ['title', 'price','id'];
  dataSource :any
  subscription!: Subscription
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService: ProductService) { 
    this.subscription=this.productService.getAll()
      .subscribe(p =>{
        this.products  = p
        this.initializeTable(p)
      });
  }
    
private initializeTable(products: Pd[]){
  this.dataSource=new MatTableDataSource<Pd>(products)
  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
}
  ngOnInit(): void {
  }

  filter(query:string){
    
    // query = query.trim(); // Remove whitespace
    // query = query.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = query;

    let flterProducts = (query) ?
       this.products.filter((p:any) => p.title.toLowerCase().includes(query.toLocaleLowerCase())) :
       this.products;
    console.log(flterProducts)
    this.initializeTable(flterProducts)
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}


export interface Pd {
  title: string;
  price: number;
  ke: string;
}

const ELEMENT_DATA: Pd[] = [
  { title: "hello1", price: 1.0079, ke: 'H' },
  { title: "hello1",  price: 4.0026, ke: 'He' },
  { title: "hello1", price: 6.941, ke: 'Li' },
  { title: "hello1",  price: 9.0122, ke: 'Be' },
  { title: "hello1",  price: 10.811, ke: 'B' },
  { title: "hello1",  price: 12.0107, ke: 'C' },
  { title: "hello1",  price: 14.0067, ke: 'N' },
  { title: "hello1",  price: 15.9994, ke: 'O' },
  { title: "hello1", price: 18.9984, ke: 'F' },
  { title: "hello1", price: 20.1797, ke: 'Ne' },
]
