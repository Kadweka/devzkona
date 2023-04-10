import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-running-payroll-center',
  templateUrl: './running-payroll-center.component.html',
  styleUrls: ['./running-payroll-center.component.scss']
})
export class RunningPayrollCenterComponent {
  payrollFormGroup!: UntypedFormGroup;
  isLoading = false;
  isEditing = false;
  constructor(
    private router: Router,
    private employeeService: EmployeesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RunningPayrollCenterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.payrollFormGroup = this.formBuilder.group({
      name:['',[Validators.required]],
      date_start:['',[Validators.required]],
      date_end:['',[Validators.required]]
    })
  }

  onCloseDialog(dialogData?: any): any {
    const { reload = false, data = null } = dialogData || {};
    this.dialogRef.close({ reload, data });
  }
  new_batch(){}
}
