import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'profle',
        pathMatch: 'full',
      },
       {
        path: 'profle',
        component: ProfileComponent,
        },
         {
        path: 'system-users',
        component: UsersComponent,
        },
         {
        path: 'departments',
        component: DepartmentsComponent,
        }
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule { }
