import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  isLoading = false
  employeeFormGroup!: UntypedFormGroup;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeFormGroup = this.formBuilder.group({
      // company_type: ['', Validators.required],
      name: ['', Validators.required],
      tax_id: ['', Validators.required],
      country_id: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      employee_department: ['', Validators.required],
      employee_manager: ['', Validators.required],

    });
  }

}
