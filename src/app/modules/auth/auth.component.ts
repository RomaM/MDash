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
  logged: string;

  constructor(private router: Router, private authService: AuthService) {
    // this.currentUser = this.authService.currentUser;
    this.logged = localStorage.getItem('logged');
    console.log('Auth Component Constructor');
  }

  ngOnInit() {
    if (this.logged) {
      this.router.navigate(['/']);
      console.log('Auth Component INIT');
    }
  }

}
