import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.scss']
})
export class AddJournalComponent implements OnInit {
  isLoading = false;
  loadingTypes=false
  journalFormGroup!: UntypedFormGroup;
  accounts!:any[]
  types=[
    {
      id:1,name:"Sales",code:"sale"
    },
    {
      id:2,name:"Purchase",code:"purchase"
    },
    {
      id:3,name:"Cash",code:"cash"
    },
    {
      id:4,name:"Bank",code:"bank"
    },
    {
      id:5,name:"Miscellaneous",code:"general"
    }
  ]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddJournalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private journalService:AccountingService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.journalFormGroup = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      default_account_id:[''],
    });
    // this.getAccount()
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  // getAccount(){
  //   const payload={
  //     token:localStorage.getItem("access_token"),
  //     name:"",
  //     limit:1000,
  //     offset:0
  //   }
  //   this.loadingTypes=true
  //       // @ts-ignore
  //   this.journalService.getAccounts(payload).subscribe(res=>{
  //     if(res.result.code ==200){
  //       this.accounts=res.result.accounts
  //       this.loadingTypes=false
  //     }
  //   })
  // }

  addJournal(){
    const payload = {
      type: this.journalFormGroup.get("type")?.value,
      name: this.journalFormGroup.get("name")?.value,
      code: this.journalFormGroup.get("code")?.value,
      default_account_id: this.journalFormGroup.get("default_account_id")?.value,
      token:localStorage.getItem("access_token")
    }
    this.isLoading=true
    if(this.journalFormGroup.valid){
      this.journalService.createJournal(payload).subscribe(res=>{
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
