import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // return this.router.navigate(['auth/login']);

    if (this.authService.userData) {
      return this.router.navigate(['list']);
    }
  }

}
