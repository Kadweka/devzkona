import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AccountingService } from 'src/app/core/services/accounting.service';

@Component({
  selector: 'app-add-charts-of-account',
  templateUrl: './add-charts-of-account.component.html',
  styleUrls: ['./add-charts-of-account.component.scss']
})
export class AddChartsOfAccountComponent implements OnInit {
  isLoading = false;
  loadingTypes=false
  typesData!:any[]
  chartOfAccountFormGroup!: UntypedFormGroup;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddChartsOfAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService:AccountingService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.chartOfAccountFormGroup = this.formBuilder.group({
      user_type_id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      reconcile: [''],
    });
    this.getAccountTypes()
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
    getAccountTypes(){
    const payload={
      token:localStorage.getItem("access_token"),
      name:"",
      limit:1000,
      offset:0
    }
    this.loadingTypes=true
        // @ts-ignore
    this.accountService.getAccountTypes(payload).subscribe(res=>{
      console.log(res,"THE RESULTS<!!!!!!!!!!!!!11");
      
      if(res.result.code ==200){
        this.typesData=res.result.account_types
        this.loadingTypes=false
      }
    })
  }
  addAccount(){
    const payload = {
      user_type_id: this.chartOfAccountFormGroup.get("user_type_id")?.value,
      name: this.chartOfAccountFormGroup.get("name")?.value,
      code: this.chartOfAccountFormGroup.get("code")?.value,
      token:localStorage.getItem("access_token")
    }
    console.log(this.chartOfAccountFormGroup.getRawValue(),"TESTING THE GETTTTTT")
    
    this.isLoading=true
    if(this.chartOfAccountFormGroup.valid){
      this.accountService.createChartAccount(payload).subscribe(res=>{
        if(res.result.code==200){
          this.isLoading=false
          this.toastr.showSuccess(res.result.message,"SUCCESS")
          this.onCloseDialog({reload:true})
        }else{
          this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
        }
      })
    }else{
      this.toastr.showWarning("Fill alll information","VALIDATION ERROR")
    }
  }
}
