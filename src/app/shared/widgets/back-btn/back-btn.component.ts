import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit {
  @Input() isEditable = false;
  @Input() isDeactivate = false;
  @Output() clickAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() backUrl:any;

  constructor(private location: Location, private router: Router) {
  }

  backClicked(): any {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl).then();
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void {
  }

  emitClickAction(btnType: 'edit' | 'delete'): any {
    this.clickAction.emit(btnType);
  }
}
