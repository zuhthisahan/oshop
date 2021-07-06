import { CategoryService } from './../../services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$ !: Observable<any>;
  @Input('category') category!: string|null
  constructor(categoryService :CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges();
   }

  ngOnInit(): void {
  }

}
