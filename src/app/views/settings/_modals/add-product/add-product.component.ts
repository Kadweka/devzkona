import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isLoading = false;
  productFormGroup!: UntypedFormGroup;
  isLoadingTableData = false;
  categoryData:any[]=[]
  type=[
    {id:1,name:"Consumable",code:"consu"},
    {id:2,name:"Storable Products",code:"product"},
    {id:3,name:"Service",code:"service"}
  ]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService:SettingsService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      detailed_type: ['', Validators.required],
      name: ['', Validators.required],
      list_price: ['', Validators.required],
      categ_id: ['', Validators.required],
    });
    this.getCategories()
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  getCategories(){
    const payload = {
      name:"",
      limit:100000,
      token:localStorage.getItem('access_token'),
      offset:0
    }
    this.isLoadingTableData=true
        // @ts-ignore
    this.categoryService.getCategories(payload).subscribe(res=>{
      this.categoryData=res.result.category
      this.isLoadingTableData=false
    })
  }
  addNewProduct(){
    const payload = {
      token:localStorage.getItem('access_token'),
      "name":this.productFormGroup.get("name")?.value,
      "detailed_type":this.productFormGroup.get("detailed_type")?.value,
      "list_price":this.productFormGroup.get("list_price")?.value,
      "categ_id":this.productFormGroup.get("categ_id")?.value,
    }
    if(this.productFormGroup.valid){
      this.isLoading=true
      this.categoryService.createProduct(payload).subscribe(res=>{
      if(res.result.code==200){
        this.isLoading=false 
        this.toastr.showSuccess(res.result.message,"SOMETHING WENTNWRONG")
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