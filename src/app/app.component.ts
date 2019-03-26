import {
  AfterContentInit, AfterViewInit, Component, DoCheck, NgZone, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterContentInit, OnDestroy {

  constructor(private ngZone: NgZone) {
    // Preventing continual internal changes/operations from triggering change detection in DoCheck()
    this.ngZone.runOutsideAngular(() => {
      firebase.initializeApp(environment.firebase);
    });
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
