import { Component, OnInit } from '@angular/core';
import { UserCardInterface } from "../../../shared/interfaces/user-card-interface";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private activatedRoute: ActivatedRoute,

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

  }

}
