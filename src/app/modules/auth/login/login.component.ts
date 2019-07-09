import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {DialogHostDirective} from '../../../shared/directives/dialog-host.directive';
import {DialogService} from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DialogHostDirective, {static: false}) dialogHost: DialogHostDirective;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  loginForm: FormGroup;
  hide = true;
  error = null;

  ngOnInit() {
    this.formInit();

  }

  ngAfterViewInit() {
    console.log(this.dialogHost);
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
            this.error = err;
            this.dialogService.addDialogComponent(this.dialogHost.viewContainerRef, 'Title', 'Message', this.onCloseDialog);
          }
        );
    }
  }

  signOutUser() {
    this.authService.signOut();
  }

  onCloseDialog() {
    this.error = null;
  }

  ngOnDestroy() {

  }

}
