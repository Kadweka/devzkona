import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { DetailTripComponent } from './detail-trip/detail-trip.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: TripsComponent,
        data: { returnUrl: window.location.pathname }
      },
      {
        path: 'details-trip/:id',
        component: DetailTripComponent,
      },
      {
        path: 'new-trip',
        component: AddTripComponent,
      },
    ]
  },
  { path: '**', redirectTo: '/trips', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
