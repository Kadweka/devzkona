import { NgModule } from '@angular/core';
import { JournalsComponent } from './journals/journals/journals.component';
import { AddJournalComponent } from './_modals/add-journal/add-journal.component';
import { EditJournalComponent } from './journals/edit-journal/edit-journal.component';
import { ChartsOfAccountComponent } from './charts-of-accounts/charts-of-account/charts-of-account.component';
import { AddChartsOfAccountComponent } from './_modals/add-charts-of-account/add-charts-of-account.component';
import { EditChartsOfAccountComponent } from './charts-of-accounts/edit-charts-of-account/edit-charts-of-account.component';
import { AddTaxesComponent } from './_modals/add-taxes/add-taxes.component';
import { EditTaxesComponent } from './taxes/edit-taxes/edit-taxes.component';
import { TaxesComponent } from './taxes/taxes/taxes.component';
import { AccountingComponent } from './accounting/accounting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsRoutingModule } from './account-routing.module';
import { JournalItemsComponent } from './journal-items/journal-items.component';
import { JournalEntriesComponent } from './journal-entries/journal-entries.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    JournalsComponent,
    AddJournalComponent,
    EditJournalComponent,
    ChartsOfAccountComponent,
    AddChartsOfAccountComponent,
    EditChartsOfAccountComponent,
    AddTaxesComponent,
    EditTaxesComponent,
    TaxesComponent,
    AccountingComponent,
    JournalItemsComponent,
    JournalEntriesComponent,
    TrialBalanceComponent],
  imports: [
    SharedModule,
    AccountsRoutingModule
  ]
})
export class AccountingModule { }
