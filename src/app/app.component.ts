import { Component } from '@angular/core';
import {fromEvent, merge, Observable, Observer} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DEVZKONA';
  hasInternetConnection = true;
  deferredPrompt: any;
  constructor(
  ){
  }
  ngOnInit(): void {
    this.createOnline$().subscribe(
      (isOnline: boolean) => {
        this.hasInternetConnection = isOnline;
        console.log('Are you online? ', isOnline);
      }
    );
  }
  createOnline$(): any {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
