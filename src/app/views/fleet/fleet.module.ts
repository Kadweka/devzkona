import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetComponent } from './fleet/fleet.component';
import { CarManufacturerComponent } from './car-manufacturer/car-manufacturer.component';
import { CarModelComponent } from './car-model/car-model.component';
import { CarServicesComponent } from './car-services/car-services.component';
import { CarsComponent } from './cars/cars.component';
import {SharedModule} from '../../shared/shared.module';
import { FleetRoutingModule } from './fleet-routing.module';
import { AddFleetComponent } from './_modal/add-fleet/add-fleet.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypeComponent } from './_modal/add-service-type/add-service-type.component';
import { AddCarServiceComponent } from './_modal/add-car-service/add-car-service.component';



@NgModule({
  declarations: [
    FleetComponent,
    CarManufacturerComponent,
    CarModelComponent,
    CarServicesComponent,
    CarsComponent,
    AddFleetComponent,
    ServiceTypesComponent,
    AddServiceTypeComponent,
    AddCarServiceComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FleetRoutingModule
  ]
})
export class FleetModule { }
