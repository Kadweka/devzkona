import { Component, OnInit } from '@angular/core';
import {UserCardInterface} from "../../../shared/interfaces/user-card-interface";
import {ActivatedRoute} from "@angular/router";
const obj={
  national_id:"378118888",
  address:"Ngong Road",
  dob:"2023-07-01",
  gender:"Male",
  registration_date:"2023-07-01",
  nssf:"NSF4774",
  nhif:"NHIF881",
  kra_pin:"KRA001367",
  huduma_number:"0137781",
  department_name:"TECHNICAL",
  job_title:"DEVELOPER",
}
@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.scss']
})
export class DetailFileComponent implements OnInit {
  isLoading = false;
  fileCode: any;
  fileData: any = obj;
  userCardData!: UserCardInterface;
  constructor(
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.fileCode = params.id;
    });
  }

  ngOnInit(): void {
    console.log(this.fileData,"THE CUSTOMER DETAILS PAGE!!!!!!!!!")
    this.userCardData = {
      id: 'FARMER ID: Sample ID',
      institution: '',
      location: 'Sample',
      name: 'Sample Name',
      email: 'example@gmail.com',
      phone: '',
    };
  }

}
