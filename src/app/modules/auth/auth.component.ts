import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {DialogHostDirective} from '../../shared/directives/dialog-host.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.currUser) {
      // todo: Loader to prevent form appearance
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
