import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ContractsComponent } from './contracts/contracts.component';
import { StructuresComponent } from './structures/structures.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
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
      {
        path: 'employee-details/:id',
        component: EmployeeDetailsComponent,
      },
      {
        path: 'new-employee',
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
