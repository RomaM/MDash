import {AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {map} from 'rxjs/operators';
import {UserDetailsModel} from '../../../shared/models/user-details.model';

import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) { }

  loginForm: FormGroup;
  hide = true;

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  get field() {
    return this.loginForm.controls;
  }

  signInUser() {
    if (this.loginForm && this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  signOutUser() {
    this.authService.signOut();
  }

  ngOnDestroy() {

  }

}
