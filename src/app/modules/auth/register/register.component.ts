import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/validators/must-match.validator';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
      'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(4)])
    }, MustMatch('password', 'confirmPassword'));
  }

  get field() {
    return this.registerForm.controls;
  }

  signUpUser() {
    if (this.registerForm && this.registerForm.valid) {
      console.log('Register form is valid');
      this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password).then(
        (data) => console.log(data)
      );
    }
  }
}
