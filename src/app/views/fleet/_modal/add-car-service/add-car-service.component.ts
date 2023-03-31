import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import { FleetService } from 'src/app/core/services/fleet.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AddServiceTypeComponent } from '../add-service-type/add-service-type.component';

@Component({
  selector: 'app-add-car-service',
  templateUrl: './add-car-service.component.html',
  styleUrls: ['./add-car-service.component.scss'],
})
export class AddCarServiceComponent {
  loadingvehicle = false;
  loadingVendor = false;
  isLoading = false;
  serviceFormGroup!: UntypedFormGroup;
  vendorData: any[] = [];
  ServiceTypes: any[] = [];
  vehicleData: any[] = [];
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddServiceTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fleetService: FleetService,
    private customersService: CustomersService,
    private toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.serviceFormGroup = this.formBuilder.group({
      description: [, Validators.required],
      vehicle_id: [, Validators.required],
      service_type_id: [, Validators.required],
      purchaser_id: [, Validators.required],
      date: [, Validators.required],
      vendor_id: [, Validators.required],
      amount: [, Validators.required],
      category: [, Validators.required],
    });
    this.getServiceTypes();
    this.getServiceTypes();
    this.getVehicle();
    this.getVendor()
  }
  getVendor() {
    const payload = {
      limit: 10000,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    this.loadingVendor = true;
    // @ts-ignore
    this.customersService.getCustomers(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.vendorData = res.result.customers;
        this.loadingVendor = false;
      } else {
        this.toastr.showWarning(res.result.Message, 'SOMETHING IS WRONG');
        this.loadingVendor = false;
      }
    });
  }
  getServiceTypes() {
    const payload = {
      limit: 10000,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    this.fleetService.getServiceTypes(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.ServiceTypes = res.result.service_types;
      }
    });
  }
  getVehicle() {
    const payload = {
      limit: 10000,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    // @ts-ignore
    this.fleetService.getVehicles(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.vehicleData = res.result.vehicles;
      }
    });
  }
  onCloseDialog(dialogData?: any): any {
    const { reload = false, data = null } = dialogData || {};
    this.dialogRef.close({ reload, data });
  }
  addService() {
    const payload = {
      token: localStorage.getItem('access_token'),
      description: this.serviceFormGroup.get('description')?.value,
      vehicle_id: this.serviceFormGroup.get('vehicle_id')?.value,
      service_type_id: this.serviceFormGroup.get('service_type_id')?.value,
      purchaser_id: this.serviceFormGroup.get('purchaser_id')?.value,
      date: this.serviceFormGroup.get('date')?.value,
      vendor_id: this.serviceFormGroup.get('vendor_id')?.value,
      amount: this.serviceFormGroup.get('amount')?.value,
      category: this.serviceFormGroup.get('category')?.value,
    };
    if (this.serviceFormGroup.valid) {
      this.isLoading = true;
      this.fleetService.createFleetService(payload).subscribe((res) => {
        if (res.result.code == 200) {
          this.isLoading = false;
          this.toastr.showSuccess(res.result.message, 'SUCCESS');
          this.onCloseDialog({ reload: true });
        } else {
          this.toastr.showWarning(res.result.message, 'SOMETHING WENTNWRONG');
        }
      });
    } else {
      this.toastr.showWarning(
        'Please fill in all information',
        'VALIDATION ERROR!'
      );
    }
    this.isLoading = false;
  }
}
