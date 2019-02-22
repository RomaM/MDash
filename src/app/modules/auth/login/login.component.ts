import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  loginForm: FormGroup;
  hide = true;

  ngOnInit() {
    // this.authService.getToken();


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
      console.log('Login form is valid');
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  signOutUser() {
    this.authService.signOut();
  }

}
