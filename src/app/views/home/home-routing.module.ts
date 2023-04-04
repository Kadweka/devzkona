import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddFileComponent } from './add-file/add-file.component';
import { DetailFileComponent } from './detail-file/detail-file.component';
import { FileListingComponent } from './file-listing/file-listing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/file',
    pathMatch: 'full'
  },
  {
      path: '',
      children: [
        {
          path: '',
          component: HomeComponent,
        },
        {
          path: 'file-details/:id',
          component: DetailFileComponent,
        },
        {
          path: 'open-file',
          component: AddFileComponent,
        },
      ]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
