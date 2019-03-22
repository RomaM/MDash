import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    console.log('COMPONENT: AuthComponent - Init');
    if (this.authService.isLogged) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    // this.authService.isLogged.complete();
  }

}
