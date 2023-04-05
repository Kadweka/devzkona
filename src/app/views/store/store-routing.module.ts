import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../store/category/category.component';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
    {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path:'categories',
        component:CategoryComponent
      },
      {
        path:'products',
        component:ProductsComponent
      }
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StoreRoutingModule { }
