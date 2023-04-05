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
import { AddDepartmentComponent } from './_modals/add-department/add-department.component';


@NgModule({
  declarations: [UsersComponent, AddUsersComponent, EditUsersComponent, SettingsComponent, ProfileComponent, DepartmentsComponent, AddDepartmentComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
