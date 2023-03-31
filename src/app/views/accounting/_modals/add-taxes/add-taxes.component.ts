import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-taxes',
  templateUrl: './add-taxes.component.html',
  styleUrls: ['./add-taxes.component.scss']
})
export class AddTaxesComponent implements OnInit {
  isLoading = false;
  taxFormGroup!: UntypedFormGroup;
  types=[
    {
      id:1,name:"Sales",code:"sale"
    },
    {
      id:2,name:"Purchase",code:"purchase"
    },
    {
      id:3,name:"none",code:"none"
    }
  ]
  scope=[
    {
      id:1,name:"Goods",code:"consu"
    },
    {
      id:2,name:"Service",code:"service"
    }
  ]
  amount_types=[
    {
      id:1,name:"Group of Taxes",code:"group"
    },
    {
      id:2,name:"Percentage of Price",code:"percent"
    },
    {
      id:3,name:"Fixed Amount",code:"fixed"
    },
    {
      id:3,name:"Percentage of Price Included",code:"division"
    }
  ]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddTaxesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private journalService:AccountingService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.taxFormGroup = this.formBuilder.group({
      type_tax_use: ['', Validators.required],
      name: ['', Validators.required],
      amount_type: [, Validators.required],
      amount: [, Validators.required],
      tax_scope: ['', Validators.required],
    });
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  addTax(){
    console.log(this.taxFormGroup.getRawValue(),"FORM VALUES");
    
    const payload = {
      type_tax_use: this.taxFormGroup.get("type_tax_use")?.value,
      name: this.taxFormGroup.get("name")?.value,
      amount_type: this.taxFormGroup.get("amount_type")?.value,
      amount: this.taxFormGroup.get("amount")?.value,
      tax_scope: this.taxFormGroup.get("tax_scope")?.value,
      token:localStorage.getItem("access_token")
    }
    this.isLoading=true
    if(this.taxFormGroup.valid){
      this.journalService.createTax(payload).subscribe(res=>{
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
