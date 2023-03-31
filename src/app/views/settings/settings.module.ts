import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './_modals/add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './setting-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddDepartmentComponent } from './_modals/add-department/add-department.component';
import { AddCategoryComponent } from './_modals/add-category/add-category.component';
import { AddProductComponent } from './_modals/add-product/add-product.component';



@NgModule({
  declarations: [UsersComponent, AddUsersComponent, EditUsersComponent, SettingsComponent, ProfileComponent, DepartmentsComponent, ProductsComponent, CategoryComponent, AddDepartmentComponent, AddCategoryComponent, AddProductComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
