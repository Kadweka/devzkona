import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddFileComponent } from './add-file/add-file.component';
import { DetailFileComponent } from './detail-file/detail-file.component';
import { FileListingComponent } from './file-listing/file-listing.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: FileListingComponent,
      },
      {
        path: 'new-file',
        component: AddFileComponent,
      },
      {
        path: 'file-details/:id',
        component: DetailFileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
