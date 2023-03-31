import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { RequestSupportComponent } from './request-support/request-support.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportRoutingModule } from './support-routing.module';



@NgModule({
  declarations: [SupportComponent, RequestSupportComponent, EditRequestComponent],
  imports: [
    SharedModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
