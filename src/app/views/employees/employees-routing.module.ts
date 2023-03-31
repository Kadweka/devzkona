import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './_modals/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ContractsComponent } from './contracts/contracts.component';
import { StructuresComponent } from './structures/structures.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { EmployeeTabsComponent } from './employee-tabs/employee-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path:'',
        component:EmployeeTabsComponent,
        children: [
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            },
            {
              path: 'contracts',
              component: ContractsComponent,
            },
            {
              path: 'salary-structures',
              component: StructuresComponent,
            },
            {
              path: 'list',
              component: EmployeeListingComponent,
            },
        ]
      },
      {
        path: 'employee-details/:id',
        component: EmployeeDetailsComponent,
      },
      {
        path: 'new',
        component: AddEmployeeComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
