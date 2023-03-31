import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FarmerUserCardInterface,
  UserCardInterface,
} from '../../interfaces/user-card-interface';

@Component({
  selector: 'app-card-user',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() userCardData!: UserCardInterface;
  @Input() hasButton:any;
  @Input() buttonLabel:any;
  @Input() buttonURL:any;
  @Input() buttonIcon = 'add';
  @Input() isFarmer = false;
  @Input() farmerCardData!: FarmerUserCardInterface;
  @Input() icon:any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  buttonClick(): any {
    this.onButtonClick.emit();
  }
}
