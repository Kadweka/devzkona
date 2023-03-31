import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  userName :any
  company:any
  isLoading=false
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userName=localStorage.getItem("userName")
    this.company=localStorage.getItem('company_name')
  }

  // tslint:disable-next-line:typedef
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logMeOut(){
   this.authService.logMeOut()
  }
}
