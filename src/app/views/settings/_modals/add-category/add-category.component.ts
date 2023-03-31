import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  isLoading = false;
  categFormGroup!: UntypedFormGroup;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService:SettingsService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.categFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  addNewCategory(){
    const payload = {
      token:localStorage.getItem("access_token"),
      name: this.categFormGroup.get('name')?.value,
    }
    if(this.categFormGroup.valid){
      this.isLoading=true
      this.categoryService.createCategories(payload).subscribe(res=>{
      if(res.result.code==200){
        this.isLoading=false 
        this.toastr.showSuccess(res.result.message,"SUCCESS")
        this.onCloseDialog({reload:true})
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENTNWRONG")
      }
      }) 
    }else{
      this.toastr.showWarning("Please fill in all information","VALIDATION ERROR!")
    }
    this.isLoading=false
  }
}