import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersComponent } from './customers/customers.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/customers',
      pathMatch: 'full'
    },
    {
        path: '',
        children: [
          {
            path: '',
            component: CustomersComponent,
                data: {returnUrl: window.location.pathname}
          },
          {
            path: 'customer-details/:id',
            component: DetailCustomerComponent,
          },
          {
            path: 'new-customer',
            component: AddCustomerComponent,
          },
        ]
    },
    { path: '**', redirectTo: '/customers', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomersRoutingModule { }