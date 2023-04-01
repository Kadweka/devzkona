import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserCardInterface } from 'src/app/shared/interfaces/user-card-interface';
const obj = {
  national_id: "378118888",
  address: "Ngong Road",
  dob: "2023-07-01",
  gender: "Male",
  registration_date: "2023-07-01",
  nssf: "NSF4774",
  nhif: "NHIF881",
  kra_pin: "KRA001367",
  huduma_number: "0137781",
  department_name: "TECHNICAL",
  job_title: "DEVELOPER",
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})

export class EmployeeDetailsComponent implements OnInit {
  isLoading = false;
  employeeCode: any;
  employeeData: any = obj;
  userCardData!: UserCardInterface;
  detailsData:any
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService,
    private toastr: ToasterService,

  ) {

    this.activatedRoute.params.subscribe(params => {
      this.employeeCode = params.id;
    });

  }

  ngOnInit(): void {
    this.userCardData = {
      id: 'Employee ID: Sample ID',
      institution: '',
      location: 'Sample',
      name: 'Sample Name',
      email: 'example@gmail.com',
      phone: '',
    };
this.getEmployees()
  }
  getEmployees(){
    const payload = {
      limit: 10,
      offset: 0,
      employee_id:this.employeeCode,
      token: localStorage.getItem('access_token')
    };
    this.isLoading = true;
    // @ts-ignore
    this.employeeService.getEmployeeDetails(payload).subscribe(res => {
      console.log(res,"TESTING THE VALUES!!!!!!!!!!!!!!!1111");
      
     if(res.result.code==200){
      this.userCardData = {
        id: 'Employee ID: Sample ID',
        institution: '',
        location: res.result.information.country,
        name: res.result.information.name,
        email: res.result.information.email,
        phone: res.result.information.mobile,
      };
      this.detailsData=res.result.information
      this.isLoading = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoading = false;
      }
    });
  }
}
