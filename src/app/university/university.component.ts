import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TokenStorage } from './token.storage';

import { HeaderFooterComponent } from '../common/header-footer/header-footer.component';
import { EmptyStringValidator } from '../common/validators/empty-string-validator';

import { UniversityService } from './university.service';
import { University} from './university';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit, OnDestroy {
  universityInstance: University;
  loggedIn: boolean;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginError: string;
  logoutObserSub: Subscription;


  constructor(
    private fb: FormBuilder,
    private universityService: UniversityService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private token: TokenStorage,
    private header: HeaderFooterComponent,
    private ref: ChangeDetectorRef
  ) {
    this.universityInstance = null;

    this.checkLoginStatus();
    this.createLoginForm();
    this.createSignupForm();
    this.subcribeToLogoutObservable();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.logoutObserSub.unsubscribe();
  }

  subcribeToLogoutObservable() {
    this.logoutObserSub = this.universityService.logoutObservable$
      .subscribe((data) => {
        if (data) {
          this.loggedIn = false;
          this.clearForms();
          this.universityInstance = null;
        }
      });
  }

  clearForms() {
    this.loginForm.reset();
    this.signupForm.reset();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, EmptyStringValidator]],
      password: ['', Validators.required]
    });
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, EmptyStringValidator]],
      username: ['', [Validators.required, EmptyStringValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  login() {
    const loginFormValue = this.loginForm.value;
    const loginObject = {
      username: loginFormValue.username.trim(),
      password: loginFormValue.password,
    };
    this.universityService.authenticate(loginObject)
    .subscribe(
      response => {
        console.log(response);
      if (response) {
        this.loggedIn = true;
        this.getUniversityInfo(this.token.getId());
        console.log('logged in');
      }},
       error => {
         if(error.error.error == "Unauthorized" || error.error.status == 401) this.loginError="Invalid username or password";
         console.error(error);
         this.loginError=error.message;
       }
    );
  }

  signup() {
    const signupFormValue = this.signupForm.value;
    if (signupFormValue.password !== signupFormValue.confirmPassword) {
      return;
    }
    const signupObject = {
      name: signupFormValue.name.trim(),
      username: signupFormValue.username.trim(),
      email: signupFormValue.email.trim(),
      password: signupFormValue.password,
      roles: ['USER'],
      active: 'true'
    };
    console.log(signupObject);
    this.universityService.signupUser(signupObject)
    .subscribe(response => {
      console.log(response);
      console.log(response.status);

    if (response.status === 201) {
      console.log(response.headers.status);
      this.loginForm.value.username = signupObject.username;
      this.loginForm.value.password = signupObject.password;
      this.login();
    }},
   error => {
         console.error(error);
       });
  }
  getUniversityInfo(id: any){
    console.log('------------------------------------UniversityComponent: getUniversityInfo()');
    this.universityService.getInfo
    .subscribe(response => {
      if(response.body)
      this.universityInstance=response.body;
      console.log(response);
    },
    error => {
      console.error(error)
    });
  }
  checkLoginStatus(){
    if(this.universityService.checkLogin()){
      console.log("correct");
       this.loggedIn=true;
       this.getUniversityInfo(this.token.getId());
       
    }
    else{

      this.loggedIn=false;
       return false;
    }
  }
}
