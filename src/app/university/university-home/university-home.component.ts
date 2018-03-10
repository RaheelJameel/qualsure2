import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TokenStorage } from '../token.storage';

import { HeaderFooterComponent } from '../../common/header-footer/header-footer.component';
import { EmptyStringValidator } from '../../common/validators/empty-string-validator';

import { UniversityService } from '../university.service';
import { University} from '../university';

@Component({
  selector: 'app-university-home',
  templateUrl: './university-home.component.html',
  styleUrls: ['./university-home.component.scss']
})
export class UniversityHomeComponent implements OnInit, OnDestroy {
  universityInstance: University;
  loggedIn: boolean;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginError: string;
  logoutObserSub: Subscription;
  signUpError: string;
  stepTwoForm: FormGroup;
  stepTwo:boolean;
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
      password: ['', [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  createStepTwoForm() {
    this.stepTwoForm = this.fb.group({
      phoneNumberP1: ['', [Validators.required, Validators.pattern('+?([0-9]{2})')]],
      phoneNumberP2: ['', [Validators.required, Validators.pattern('[0-9]{2-3}')]],
      phoneNumberP3: ['', [Validators.required, Validators.pattern('[0-9]{7-8}')]],
      universityRepresentativeCnicP1: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      universityRepresentativeCnicP2: ['', [Validators.required, Validators.pattern('[0-9]{7}')]],
      universityRepresentativeCnicP3: ['', [Validators.required,Validators.pattern('[0-9]{1}')]],
      universityRepresentativeName: ['', [Validators.required,Validators.pattern('[a-zA-Z]')]],
      universityRepresentativePhoneNumberP1: ['', [Validators.required, Validators.pattern('+?([0-9]{2})')]],
      universityRepresentativePhoneNumberP2: ['', [Validators.required, Validators.pattern('[0-9]{2-3}')]],
      universityRepresentativePhoneNumberP3: ['', [Validators.required, Validators.pattern('[0-9]{7-8}')]],
    });
  }

  login(fromSignup?: boolean) {
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
        console.error(error);
         if(fromSignup){
          this.signUpError=error.message;
         }
         else{
          if(error.error.error == "Unauthorized" || error.error.status == 401) this.loginError="Invalid username or password";
          else this.loginError=error.message;
         }
       }
    );
  }
  nextStep() {
    this.createStepTwoForm();
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
      this.login(true);
    }},
   error => {
    this.signUpError=error.message;
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
