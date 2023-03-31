import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StructuresComponent } from './structures/structures.component';
import { ContractsComponent } from './contracts/contracts.component';

@NgModule({
  declarations: [StructuresComponent,ContractsComponent,EmployeesComponent, AddEmployeeComponent, EmployeeDetailsComponent, EditEmployeeComponent, EmployeeListingComponent],
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class EmployeesModule { }
