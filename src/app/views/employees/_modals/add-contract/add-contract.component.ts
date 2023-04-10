import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss'],
})
export class AddContractComponent {
  isLoading = false;
  loadingStructure = false;
  employees: any[] = [];
  structure: any[] = [];
  contractFormGroup!: UntypedFormGroup;
  isEditing = false;
  constructor(
    private router: Router,
    private employeeService: EmployeesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToasterService
  ) {}
  ngOnInit(): void {
    this.contractFormGroup = this.formBuilder.group({
      employee_id: ['', [Validators.required]],
      date_start: ['', [Validators.required]],
      struct_id: ['', [Validators.required]],
      wage: ['', [Validators.required]],
      hra: [''],
      travel_allowance: [''],
      medical_allowance: [''],
      other_allowance: [''],
      name: [''],
      date_end: [],
      sacco_loan: [''],
      sacco_saving: [''],
      bank_loan: [''],
    });
    this.getEmployees();
    this.getStructure();
    if (this.data.action == 'EDIT') {
      console.log(this.data, 'THE VALUES NEEDED!!!!!!!!!!!!!!!!!11');

      this.isEditing = true;
      this.contractFormGroup.patchValue(this.data.element);
      console.log(this.isEditing);
      
    } else {
      this.isEditing = false;
    }
  }
  getEmployees() {
    const payload = {
      limit: 100000,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    this.isLoading = true;
    // @ts-ignore
    this.employeeService.getEmployees(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.employees = res.result.employee;
        this.isLoading = false;
      } else {
        this.toastr.showWarning(res.result.Message, 'SOMETHING IS WRONG');
        this.isLoading = false;
      }
    });
  }
  getStructure() {
    const payload = {
      limit: 10000,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    this.loadingStructure = true;
    // @ts-ignore
    this.employeeService.getStructure(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.structure = res.result.structure;
        this.loadingStructure = false;
      } else {
        this.toastr.showWarning(res.result.Message, 'SOMETHING IS WRONG');
        this.loadingStructure = false;
      }
    });
  }

  new_contract() {
    if (this.contractFormGroup.valid) {
      this.isLoading = true;
      if (this.isEditing) {
        const payload = {
          employee_id: this.contractFormGroup.get('employee_id')?.value,
          name: this.contractFormGroup.get('name')?.value,
          date_start: this.contractFormGroup.get('date_start')?.value,
          struct_id: this.contractFormGroup.get('struct_id')?.value,
          hra: this.contractFormGroup.get('hra')?.value,
          travel_allowance: this.contractFormGroup.get('travel_allowance')?.value,
          medical_allowance: this.contractFormGroup.get('medical_allowance')?.value,
          other_allowance: this.contractFormGroup.get('other_allowance')?.value,
          wage: this.contractFormGroup.get('wage')?.value,
          date_end: this.contractFormGroup.get('date_end')?.value,
          sacco_loan: this.contractFormGroup.get('sacco_loan')?.value,
          sacco_saving: this.contractFormGroup.get('sacco_saving')?.value,
          bank_loan: this.contractFormGroup.get('bank_loan')?.value,
          contract_id:this.data.element.id,
          token: localStorage.getItem('access_token'),
        };
        this.employeeService.updateContracts(payload).subscribe((res) => {
          if (res.result.code == 200) {
            this.toastr.showSuccess(res.result.message, 'SUCCESS');
            this.isLoading = false;
            this.onCloseDialog({ reload: true });
          }
        });
      } else {
        const payload = {
          employee_id: this.contractFormGroup.get('employee_id')?.value,
          name: this.contractFormGroup.get('name')?.value,
          date_start: this.contractFormGroup.get('date_start')?.value,
          struct_id: this.contractFormGroup.get('struct_id')?.value,
          hra: this.contractFormGroup.get('hra')?.value,
          travel_allowance: this.contractFormGroup.get('travel_allowance')?.value,
          medical_allowance: this.contractFormGroup.get('medical_allowance')?.value,
          other_allowance: this.contractFormGroup.get('other_allowance')?.value,
          wage: this.contractFormGroup.get('wage')?.value,
          date_end: this.contractFormGroup.get('date_end')?.value,
          sacco_loan: this.contractFormGroup.get('sacco_loan')?.value,
          sacco_saving: this.contractFormGroup.get('sacco_saving')?.value,
          bank_loan: this.contractFormGroup.get('bank_loan')?.value,
          token: localStorage.getItem('access_token'),
        };
        this.employeeService.createContract(payload).subscribe((res) => {
          if (res.result.code == 200) {
            this.toastr.showSuccess(res.result.message, 'SUCCESS');
            this.isLoading = false;
            this.onCloseDialog({ reload: true });
          }
        });
      }
    } else {
      this.toastr.showWarning('Invalid form', 'VALIDATION ERROR');
    }
  }
  onCloseDialog(dialogData?: any): any {
    const { reload = false, data = null } = dialogData || {};
    this.dialogRef.close({ reload, data });
  }
}
