import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  isLoading = false;
  tripFormGroup!: UntypedFormGroup;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.tripFormGroup = this.formBuilder.group({
      // company_type: ['', Validators.required],
      // tax_id: ['', Validators.required],
      name: ['', Validators.required],
      relatedfile: ['', Validators.required],
      transporttype: ['', Validators.required],
      date: ['', Validators.required],
      vehicleplate: ['', Validators.required],
      driver: ['', Validators.required],
      turnboy: ['', Validators.required],

    });
  }

}
