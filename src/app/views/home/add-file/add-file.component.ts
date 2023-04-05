import { Component, Inject, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { FilesService } from 'src/app/core/services/files.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  fileForm!: UntypedFormGroup;
  isLoading = false;
  isEditing=false
  fileCode=""
  files!:any[]
  loadingCountry=false
  country:any[]=[]

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToasterService,
    public dialogRef: MatDialogRef<AddFileComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService:SettingsService,
    private fileService:FilesService,
    // public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params != null) {
        this.isEditing=true
        this.fileCode = params.id;
      }else{
        this.isEditing=false
      }
    });

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

    this.getCountries()
  }

  addFile(){
    this.isLoading=true
    if(this.fileForm.valid){
      if(this.isEditing){
        const payload = {
          customer_id: this.fileForm.get("customer_id")?.value,
          bill_ref: this.fileForm.get("bill_ref")?.value,
          country_id: this.fileForm.get("country_id")?.value,
          dep_date: this.fileForm.get("dep_date")?.value,
          inv_ref: this.fileForm.get("inv_ref")?.value,
          arr_date: this.fileForm.get("arr_date")?.value,
          journal_id: this.fileForm.get("journal_id")?.value,
          date: this.fileForm.get("date")?.value,
          return_date: this.fileForm.get("return_date")?.value,
          token:localStorage.getItem("access_token"),
          partner_id:this.fileCode
        }
        this.fileService.updateFile(payload).subscribe(res=>{
          if(res.result.code==200){
            this.isLoading=false
            this.toastr.showSuccess(res.result.message,"SUCCESS")
            this.router.navigate([`/customers`])
          }else{
            this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
          }
        })
      }
      else{
        const payload = {
          name: this.fileForm.get("name")?.value,
          company_type: this.fileForm.get("company_type")?.value,
          country_id: this.fileForm.get("country_id")?.value,
          city: this.fileForm.get("city")?.value,
          phone: this.fileForm.get("phone")?.value,
          email: this.fileForm.get("email")?.value,
          property_account_receivable_id: this.fileForm.get("property_account_receivable_id")?.value,
          property_account_payable_id: this.fileForm.get("property_account_payable_id")?.value,
          token:localStorage.getItem("access_token")
        }
        this.fileService.createFile(payload).subscribe(res=>{
          if(res.result.code==200){
            this.isLoading=false
            this.toastr.showSuccess(res.result.message,"SUCCESS")
            this.router.navigate([`/customers`])
          }else{
            this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
          }
        })
      }
    }else{
      this.toastr.showWarning("Fill all information","VALIDATION ERROR")
    }
  }

  getCountries(){
    const payload = {
      limit: 1000,
      name:"",
      offset: 0,
      token: localStorage.getItem('access_token')
    };
    this.loadingCountry=true
            // @ts-ignore
    this.settingService.getCountries(payload).subscribe(res=>{
      if(res.result.code==200){
        this.country=res.result.countries
        this.loadingCountry=false
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
        this.loadingCountry=false
      }
    })
  }

}
