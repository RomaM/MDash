import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router, private authService: AuthService) {
    // this.currentUser = this.authService.currentUser;
    console.log('Auth Component Constructor');
  }

  ngOnInit() {
    this.authService.isLogged.subscribe(isLogged => {
      if (isLogged) {
        console.log('Auth Component INIT');
        this.router.navigate(['/']);
      }
    })
  }

}
