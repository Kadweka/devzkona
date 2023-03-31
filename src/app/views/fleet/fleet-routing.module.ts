import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFleetComponent } from './_modal/add-fleet/add-fleet.component';
import { FleetComponent } from './fleet/fleet.component';
import { CarsComponent } from './cars/cars.component';
import { CarManufacturerComponent } from './car-manufacturer/car-manufacturer.component';
import { CarModelComponent } from './car-model/car-model.component';
import { CarServicesComponent } from './car-services/car-services.component';
import { ServiceTypesComponent } from './service-types/service-types.component';

const routes: Routes = [
    {
    path: '',
    component: FleetComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
       {
        path: 'list',
        component: CarsComponent,
        },
         {
        path: 'manufacturer',
        component: CarManufacturerComponent,
        },
         {
        path: 'models',
        component: CarModelComponent,
        },
         {
        path: 'services',
        component: CarServicesComponent,
        },
        {
        path: 'service-types',
        component: ServiceTypesComponent,
        },
        {
          path: 'new_fleet',
          component: AddFleetComponent,
          },
      ]
    }
  ]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FleetRoutingModule { }
