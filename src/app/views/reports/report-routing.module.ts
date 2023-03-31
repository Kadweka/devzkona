import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportsComponent,
        data: {returnUrl: window.location.pathname}
      },
    ]
  },
  { path: '**', redirectTo: '/reports', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
