import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting/accounting.component';
import { ChartsOfAccountComponent } from './charts-of-accounts/charts-of-account/charts-of-account.component';
import { JournalEntriesComponent } from './journal-entries/journal-entries.component';
import { JournalItemsComponent } from './journal-items/journal-items.component';
import { JournalsComponent } from './journals/journals/journals.component';
import { TaxesComponent } from './taxes/taxes/taxes.component';


const routes: Routes = [
    {
      path:'',
      component:AccountingComponent,
      children:[
        {
          path: '',
          redirectTo: 'journal',
          pathMatch: 'full'
        },
        {
          path: 'journal',
          component: JournalsComponent,
        },
        {
          path: 'chart-of-accounts',
          component: ChartsOfAccountComponent,
        },
        {
          path: 'taxes',
          component: TaxesComponent,
        },
        {
          path: 'invoices',
          component: JournalEntriesComponent,
        },
        {
          path: 'bills',
          component: JournalItemsComponent,
        },
      ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
