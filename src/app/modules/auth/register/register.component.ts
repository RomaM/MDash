import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  registerForm: FormGroup;

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'surname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  get field() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm && this.registerForm.valid) {
      console.log('Valid');
    }
    console.log('LogIn');
  }
}
