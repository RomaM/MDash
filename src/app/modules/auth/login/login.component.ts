import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {SnackBarService} from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

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
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          res => res,
          err => {
            if (err) {
              this.snackBarService.openSnack(err.toString());
            }
          }
        );
    }
  }

}
