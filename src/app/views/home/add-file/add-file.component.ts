import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { FilesService } from 'src/app/core/services/files.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { CustomersService } from 'src/app/core/services/customers.service';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  fileForm!: UntypedFormGroup;
  isLoading = false;
  isEditing = false
  fileCode = ""
  files: any[] = []
  loadingCountry = false
  country: any[] = []
  loadingCustomers = false
  customer: any[] = []
  loadingJournals = false
  journal: any[] = []
  is_tax = [
    { name: 'yes_tax', id: 'Yes' },
    { name: 'no_tax', id: 'No' }
  ];

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToasterService,
    private settingService: SettingsService,
    private accountingService: AccountingService,
    private fileService: FilesService,
    private customerService: CustomersService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params != null) {
        this.isEditing = true
        this.fileCode = params.id;
      } else {
        this.isEditing = false
      }
    });

    this.fileForm = this.formBuilder.group({
      customer_id: ['', Validators.required],
      dep_date: ['', Validators.required],
      country_id: ['', Validators.required],
      arr_date: ['', Validators.required],
      bill_ref: ['', Validators.required],
      journal_id: ['', Validators.required],
      date: ['', Validators.required],
      return_date: ['', Validators.required],
      payment_date: ['', Validators.required],

    });
    this.getCustomers()
    this.getJournals()
    this.getCountries()
  }

  getJournals() {
    const payload = {
      limit: 100000,
      offset: 0,
      name: "",
      token: localStorage.getItem('access_token')
    };
    this.loadingJournals = true;
    // @ts-ignore
    this.accountingService.getJournals(payload).subscribe(res => {
      if (res.result.code == 200) {
        this.journal = res.result.journals;
        this.loadingJournals = false;
      } else {
        this.toastr.showWarning(res.result.Message, "SOMETHING IS WRONG")
        this.loadingJournals = false;
      }
    });
  }

  getCustomers() {
    const payload = {
      limit: 10000,
      offset: 0,
      name: "",
      token: localStorage.getItem('access_token')
    };
    this.loadingCustomers = true;
    // @ts-ignore
    this.customerService.getCustomers(payload).subscribe(res => {
      if (res.result.code == 200) {
        this.customer = res.result.customers;
        this.loadingCustomers = false;
      } else {
        this.toastr.showWarning(res.result.Message, "SOMETHING IS WRONG")
        this.loadingCustomers = false;
      }
    });
  }

  addFile() {
    const payload = {
      customer_id: this.fileForm.get("customer_id")?.value,
      bill_ref: this.fileForm.get("bill_ref")?.value,
      country_id: this.fileForm.get("country_id")?.value,
      dep_date: this.fileForm.get("dep_date")?.value,
      payment_date: this.fileForm.get("payment_date")?.value,
      arr_date: this.fileForm.get("arr_date")?.value,
      journal_id: this.fileForm.get("journal_id")?.value,
      date: this.fileForm.get("date")?.value,
      // invoice_payment_term_id: this.fileForm.get("invoice_payment_term_id")?.value,
      return_date: this.fileForm.get("return_date")?.value,
      token: localStorage.getItem("access_token"),
      partner_id: this.fileCode
    }
    if (this.fileForm.valid) {
      this.isLoading = true
      this.fileService.createFile(payload).subscribe(res => {
        if (res.result.code == 200) {
          this.toastr.showSuccess(res.result.message, "SUCCESS")
          this.isLoading = false
          this.router.navigate([`/files`])
        } else {
          this.toastr.showWarning(res.result.message, "VALIDATION ERROR")
        }
      })
    }
    else {
      const payload = {
        customer_id: this.fileForm.get("customer_id")?.value,
        bill_ref: this.fileForm.get("bill_ref")?.value,
        country_id: this.fileForm.get("country_id")?.value,
        payment_date: this.fileForm.get("payment_date")?.value,
        dep_date: this.fileForm.get("dep_date")?.value,
        arr_date: this.fileForm.get("arr_date")?.value,
        journal_id: this.fileForm.get("journal_id")?.value,
        date: this.fileForm.get("date")?.value,
        return_date: this.fileForm.get("return_date")?.value,
        token: localStorage.getItem("access_token")
      }
      this.fileService.createFile(payload).subscribe(res => {
        if (res.result.code == 200) {
          this.isLoading = false
          this.toastr.showSuccess(res.result.message, "SUCCESS")
          this.router.navigate([`/files`])
        } else {
          this.toastr.showWarning("Fill all information", "VALIDATION ERROR")
        }
      })
    }

  }

  getCountries() {
    const payload = {
      limit: 1000,
      name: "",
      offset: 0,
      token: localStorage.getItem('access_token')
    };
    this.loadingCountry = true
    // @ts-ignore
    this.settingService.getCountries(payload).subscribe(res => {
      if (res.result.code == 200) {
        this.country = res.result.countries
        this.loadingCountry = false
      } else {
        this.toastr.showWarning(res.result.message, "SOMETHING WENT WRONG")
        this.loadingCountry = false
      }
    })
  }
}
