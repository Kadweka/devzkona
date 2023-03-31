import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/support',
      pathMatch: 'full'
    },
    {
        path: '',
        children: [
          {
            path: '',
            component: SupportComponent,
                data: {returnUrl: window.location.pathname}
          },
        ]
    },
    { path: '**', redirectTo: '/support', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SupportRoutingModule { }