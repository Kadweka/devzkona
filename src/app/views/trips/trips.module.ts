import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips/trips.component';
import { TripRoutingModule } from './trip-routing.module';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { DetailTripComponent } from './detail-trip/detail-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TripsComponent, AddTripComponent, EditTripComponent, DetailTripComponent, TripListingComponent],
  imports: [
    CommonModule,
    TripRoutingModule,
    SharedModule

  ]
})
export class TripsModule { }
