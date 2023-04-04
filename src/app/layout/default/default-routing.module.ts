import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
      {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'file',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'customers',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'fleet',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/fleet/fleet.module').then((m) => m.FleetModule),
      },
      {
        path: 'trips',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/trips/trips.module').then((m) => m.TripsModule),
      },
      {
        path: 'employees',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: 'finance',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
      {
        path: 'settings',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'reports',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'support',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../views/support/support.module').then(
            (m) => m.SupportModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
