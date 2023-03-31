import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  isLoading =false
  customerFormGroup!: UntypedFormGroup;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.customerFormGroup = this.formBuilder.group({
      company_type: ['', Validators.required],
      name: ['', Validators.required],
      tax_id: ['', Validators.required],
      country_id: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      property_account_receivable_id: ['', Validators.required],
      property_account_payable_id: ['', Validators.required],

    });
  }

}
