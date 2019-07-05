import {
  AfterContentInit, AfterViewInit, Component, DoCheck, NgZone, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterContentInit, OnDestroy {

  constructor(private ngZone: NgZone, private authService: AuthService) {
    // Preventing continual internal changes/operations from triggering change detection in DoCheck()
    this.ngZone.runOutsideAngular(() => {
      firebase.initializeApp(environment.firebase);
    });
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
