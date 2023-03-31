import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { CustomersRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CustomersComponent, AddCustomerComponent, EditCustomerComponent, DetailCustomerComponent, CustomerListingComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
