import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import {MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatMenuModule } from '@angular/material/menu';
import {MatListModule } from '@angular/material/list';
import {MatCardModule } from '@angular/material/card';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TableGeneralComponent } from './widgets/table-general/table-general.component';
import { BackBtnComponent } from './widgets/back-btn/back-btn.component';
import { DataPropertyGetterPipe } from './widgets/table-general/data-property-getter.pipe';
import {UserCardComponent} from './widgets/card-user/user-card.component';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToasterComponent } from './widgets/toaster/toaster.component';



const materialModules = [
  // tslint:disable-next-line:max-line-length
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  FormsModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  CommonModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatStepperModule,
  MatButtonToggleModule
];
const components = [
  DataPropertyGetterPipe,
  TableGeneralComponent,
  BackBtnComponent,
  UserCardComponent,
];
@NgModule({
  declarations: [
    ...components,
    ToasterComponent,
  ],
  imports: [
    ...materialModules,
    RouterModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ...components,
    ...materialModules,
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
    DatePipe,
   ]
})
export class SharedModule { }
