import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  // tslint:disable-next-line:typedef
  showSuccess(message: string | undefined, title: string | undefined){
    this.toastr.success(message, title);
  }

  // tslint:disable-next-line:typedef
  showError(message: string | undefined, title: string | undefined){
    this.toastr.error(message, title);
  }

  // tslint:disable-next-line:typedef
  showInfo(message: string | undefined, title: string | undefined){
    this.toastr.info(message, title);
  }

  // tslint:disable-next-line:typedef
  showWarning(message: string | undefined, title: string | undefined){
    this.toastr.warning(message, title);
  }
}
