import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AddFileComponent } from './add-file/add-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { DetailFileComponent } from './detail-file/detail-file.component';
import { FileListingComponent } from './file-listing/file-listing.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent, 
    AddFileComponent, 
    EditFileComponent, 
    DetailFileComponent, 
    FileListingComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
