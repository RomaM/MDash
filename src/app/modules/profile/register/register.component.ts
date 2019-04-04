import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/validators/must-match.validator';
import {AuthService} from '../../../shared/services/auth.service';
import {Store} from '@ngrx/store';
import * as profileReducer from '../store/profile.reducer';
import * as ProfileActions from '../store/profile.actions';
import {UserDetailsModel} from '../../../shared/models/user-details.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<profileReducer.State>) { }

  registerForm: FormGroup;
  hide = true;
  hideCP = true;

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'surname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl(''),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'isSAdmin': new FormControl(false),
    }, MustMatch('password', 'confirmPassword'));
  }

  get field() {
    return this.registerForm.controls;
  }

  signUpUser() {
    if (this.registerForm && this.registerForm.valid) {
      console.log('Register form is valid');
      const values = this.registerForm.getRawValue();
      const uid = 'UID_DATA';
      const newUser = new UserDetailsModel(
        values.isSAdmin, values.name, values.surname, values.email, values.phone, uid
      );
      this.store.dispatch(
        new ProfileActions.RegisterUser({profile: newUser, password: values.password})
      );
      //
      // this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password).then(
      //   (data) => console.log(data)
      // );
    }
  }
}
