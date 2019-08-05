import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {SnackBarService} from '../../../shared/services/snack-bar.service';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
      this.snackBarService.closeSnack();
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(
          catchError(err => {
            // this.snackBarService.closeSnack();
            this.snackBarService.openSnack(err);
            return of(err);
          })
        )
        .subscribe(res => res);
    }
  }
}
