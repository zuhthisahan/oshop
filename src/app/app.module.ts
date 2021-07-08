import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ProductsCardComponent } from './products-card/products-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductsFilterComponent,
    ProductsCardComponent,
    ProductQuantityComponent
    
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {path:'', component:ProductsComponent},
      {path:'products', component:ProductsComponent},
      {path:'login', component:LoginComponent},
      {path:'shopping-cart', component:ShoppingCartComponent},
      
      {path:'check-out', component:CheckOutComponent, canActivate:[AuthGuard]},
      {path:'my/orders', component:MyOrdersComponent ,canActivate:[AuthGuard]},
      {path:'order-success', component:OrderSuccessComponent ,canActivate:[AuthGuard]},
 
      // If products route not found with id, check with new else product
      // Order is important [specific routes at top]
      {path:'admin/products/:id', component:ProductFormComponent ,canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products/new', component:ProductFormComponent ,canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products', component:AdminProductsComponent ,canActivate:[AuthGuard, AdminAuthGuard] },
      {path:'admin/orders', component:AdminOrdersComponent ,canActivate:[AuthGuard, AdminAuthGuard]},
     
    
    
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
