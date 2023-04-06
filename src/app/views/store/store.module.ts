import { NgModule } from '@angular/core';
import { StoreComponent } from './store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './_modals/add-product/add-product.component';
import { AddCategoryComponent } from './_modals/add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StoreComponent,
    ProductsComponent,
    CategoryComponent,
    AddProductComponent,
    AddCategoryComponent
  ],
  imports: [
    SharedModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
