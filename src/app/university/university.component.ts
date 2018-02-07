import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UniversityService} from './university.service';
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  loggedIn: boolean;
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private universityService: UniversityService) {
    this.createLoginForm();
    this.createSignupForm();
   }

  ngOnInit() {
  }

  createLoginForm(){
    this.loginForm=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  createSignupForm(){
    this.signupForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.universityService.authenticate(this.loginForm.value)
    .subscribe(response => {
      console.log(response);
    });
  }

  signup(){
    this.universityService.signupUser(this.signupForm.value)
    .subscribe(response => {
      console.log(response);
    });
  }

}
