import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  fileForm!: UntypedFormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      customer_id: ['', Validators.required],
      bill_ref: ['', Validators.required],
      dep_date: ['', Validators.required],
      country_id: ['', Validators.required],
      inv_ref: ['', Validators.required],
      arr_date: ['', Validators.required],
      journal_id: ['', Validators.required],
      date: ['', Validators.required],
      return_date: ['', Validators.required],

    });
  }

}
