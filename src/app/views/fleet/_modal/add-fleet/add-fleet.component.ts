import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { FleetService } from 'src/app/core/services/fleet.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-fleet',
  templateUrl: './add-fleet.component.html',
  styleUrls: ['./add-fleet.component.scss']
})
export class AddFleetComponent {
  fleetFormGroup1!: UntypedFormGroup;
  fleetFormGroup2!: UntypedFormGroup;
  isLoading = false;
  loadingModels=false
  modelData!:any[]
  driverData!:any[]
  transmission=[
      {code:'manual', name:'Munual'},
      {code:'automatic',name:'Automatic'},
  ]
  fuelTypesData=[
      {code:'diesel', name:'Diesel'},
      {code:'gasoline',name:'Gasoline'},
      {code:'full_hybrid',name: 'Full Hybrid'},
      {code:'plug_in_hybrid_diesel',name: 'Plug-in Hybrid Diesel'},
      {code:'plug_in_hybrid_gasoline',name: 'Plug-in Hybrid Gasoline'},
      {code:'cng',name: 'CNG'},
      {code:'lpg',name: 'LPG'},
      {code:'hydrogen',name: 'Hydrogen'},
      {code:'electric',name: 'Electric'},
  ]
  constructor(
    private router: Router,
    private toastr: ToasterService,
    private formBuilder: UntypedFormBuilder,
    private fleetService:FleetService,
    private employeeService:EmployeesService
  ) { }
  ngOnInit(): void {
    this.fleetFormGroup1 = this.formBuilder.group({
      color: ['', Validators.required],
      license_plate: ['', Validators.required],
      driver_id: [''],
      power: ['', Validators.required],
      odometer: ['', Validators.required],
      doors: ['', Validators.required],
      horsepower: ['', Validators.required],
      seats: ['', Validators.required],
      net_car_value:['',Validators.required]
    });
    this.fleetFormGroup2 = this.formBuilder.group({
      model_id: ['', Validators.required],
      transmission: ['', Validators.required],
      model_year: ['', Validators.required],
      fuel_type: ['', Validators.required],
      co2: [''],
      co2_standard: ['', Validators.required],
    });
    this.getModels()
    this.getEmployees()
  }
  getEmployees(){
    const payload={
      token:localStorage.getItem("access_token"),
      name:"",
      limit:1000,
      offset:0
    }
    this.loadingModels=true
        // @ts-ignore
    this.employeeService.getEmployees(payload).subscribe(res=>{      
      if(res.result.code ==200){
        this.driverData=res.result.employee
        this.loadingModels=false
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING IS WRONG!")
      }
    })
  }
  getModels(){
    const payload={
      token:localStorage.getItem("access_token"),
      name:"",
      limit:1000,
      offset:0
    }
    this.loadingModels=true
        // @ts-ignore
    this.fleetService.getModels(payload).subscribe(res=>{      
      if(res.result.code ==200){
        this.modelData=res.result.model
        this.loadingModels=false
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING IS WRONG!")
      }
    })
  }
  adddVehicle(){
    const payload = {
      token:localStorage.getItem("access_token"),
      color: this.fleetFormGroup1.get('color')?.value,
      license_plate: this.fleetFormGroup1.get('license_plate')?.value,
      driver_id: this.fleetFormGroup1.get('driver_id')?.value,
      power: this.fleetFormGroup1.get('power')?.value,
      net_car_value: this.fleetFormGroup1.get('net_car_value')?.value,
      doors: this.fleetFormGroup1.get('doors')?.value,
      horsepower: this.fleetFormGroup1.get('horsepower')?.value,
      seats: this.fleetFormGroup1.get('seats')?.value,
      odometer: this.fleetFormGroup1.get('odometer')?.value,
      model_id: this.fleetFormGroup2.get('model_id')?.value,
      transmission: this.fleetFormGroup2.get('transmission')?.value,
      model_year: this.fleetFormGroup2.get('model_year')?.value,
      fuel_type: this.fleetFormGroup2.get('fuel_type')?.value,
      co2: this.fleetFormGroup2.get('co2')?.value,
      co2_standard: this.fleetFormGroup2.get('co2_standard')?.value,
    }    
    if(this.fleetFormGroup1.valid && this.fleetFormGroup2.valid){
      this.isLoading=true
      this.fleetService.createVehicle(payload).subscribe(res=>{
      if(res.result.code==200){
        this.isLoading=false 
        this.router.navigate([`/fleet`]);
        this.toastr.showSuccess(res.result.message,"SUCCESS")
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



// [('manual', 'Manual'), ('automatic', 'Automatic')]

[

]