import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditRequestComponent} from '../edit-request/edit-request.component';

@Component({
  selector: 'app-request-support',
  templateUrl: './request-support.component.html',
  styleUrls: ['./request-support.component.scss']
})
export class RequestSupportComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  addItem(event: any): any{
    console.log(event, 'TESTING THE DIALOG!!!!!!!1');
    const dialogRef = this.dialog.open(EditRequestComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        // this.getUsers();
      }
    });
  }
}
