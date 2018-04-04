import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TokenStorage } from '../token.storage';

import { phoneMask, cnicMask } from '../../common/constants';
import { HeaderFooterComponent } from '../../common/header-footer/header-footer.component';
import { EmptyStringValidator } from '../../common/validators/empty-string-validator';

import { UniversityService } from '../university.service';
import { University} from '../university';
import { error } from 'util';
import {PageScrollConfig} from 'ng2-page-scroll';
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
  stepTwoFormError:string;
  phoneMask: any[] = ['+',/[1-9]/, /[0-9]/ ,' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cnicMask: any[] = [/\d/, /\d/, /\d/ ,/\d/ ,/\d/  ,'-', /\d/, /\d/, /\d/,/\d/,/\d/,/\d/,/\d/, '-', /\d/];
  localPhoneMask = phoneMask;
  localCnicMask = cnicMask;
  signupFormInvalid: boolean;
  stepTwoFormInvalid: boolean;
  submitted: boolean;
  loginNotSignup: boolean;

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
    this.createStepTwoForm();
    this.subcribeToLogoutObservable();
    PageScrollConfig.defaultScrollOffset = 56;
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
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, EmptyStringValidator,Validators.pattern('^[A-Za-z]+$')]),
      username: new FormControl ('', [Validators.required, EmptyStringValidator,Validators.pattern('^[a-zA-Z0-9\\d\\-\\_]*$')]),
      email:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  createStepTwoForm() {
    this.stepTwoForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern('^\\+?[0-9]{2}\\s?\\([0-9]{3}\\)\\s?[0-9]{3}\\-[0-9]{4}$')]),
      universityRepresentativePhoneNumber: new FormControl('', [Validators.required,Validators.pattern('^\\+?[0-9]{2}\\s?\\([0-9]{3}\\)\\s?[0-9]{3}\\-[0-9]{4}$')]),
      universityRepresentativeCnic: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}\\-[0-9]{7}\\-[0-9]{1}$')]),
      universityRepresentativeName: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z]+$')]),
      address: new FormControl('',[Validators.required])
    });
  }

  login(fromSignup?: boolean) {
    this.submitted = true;
    this.loginError = null;
    if (!fromSignup) {
      this.loginNotSignup = true;
    }
    const loginFormValue = this.loginForm.value;
    const loginObject = {
      username: loginFormValue.username.trim(),
      password: loginFormValue.password,
    };
    window.scrollTo(0, 0);
    this.universityService.authenticate(loginObject)
    .subscribe(
      response => { 
        console.log(response);
      if (response) {
        setTimeout(() => {
          window.scrollTo(0,0);
          this.loggedIn = true;
          this.stepTwo=false;
          this.getUniversityInfo(this.token.getId());
          console.log('logged in');
          this.signUpError=null;
          this.loginError=null;
          this.submitted = false;
          this.loginForm.reset();
        });
      }},
       error => {
         console.log('Error Catch:', error);
        this.submitted = false;
        console.error(error);
        if(fromSignup){
          this.stepTwoFormError=error.message;
        } else {
          if (!error.error.error && !error.error.status) {
            this.loginError = 'Connection Timed Out';
          } else if (error.error.error == "Unauthorized" || error.error.status == 401) {
            this.loginError = "Invalid username or password";
          } else {
            this.loginError = error.message;
          }
          // this.clearForms();
        }
      }
    );
  }
  nextStep() {
    this.signupFormInvalid = false;
    const signupFormValue = this.signupForm.value;
    if (this.signupForm.valid && signupFormValue.password === signupFormValue.confirmPassword) {
      this.universityService.checkUsernameAvailability(this.signupForm.get('username').value)
        .subscribe(
          response => {
            console.log(response.body.success);
            if(response.body.success===true)
              {
                window.scrollTo(0,0);
                this.stepTwo=true;
              }
              else{
                this.signUpError="Username already used please choose a different one";
              }
          },
          error => {
            if (!error.error.error && !error.error.status) {
              this.signUpError = 'Connection Timed Out';
            } else {
              this.signUpError = error.message;
            }
            console.error(error);
          }
        );
    } else {
      this.signupFormInvalid = true;
    }
  }

  signup() {
    this.stepTwoFormInvalid = false;
    if (this.stepTwoForm.valid) {
      const signupFormValue = this.signupForm.value;
      const stepTwoFormValue = this.stepTwoForm.value;
      const signupObject = {
        name: signupFormValue.name.trim(),
        username: signupFormValue.username.trim(),
        email: signupFormValue.email.trim(),
        password: signupFormValue.password,
        roles: ['USER'],
        active: 'true',
        number: stepTwoFormValue.phoneNumber,
        representativeName: stepTwoFormValue.universityRepresentativeName,
        representativeNumber: stepTwoFormValue.universityRepresentativePhoneNumber,
        representativeCNIC: stepTwoFormValue.universityRepresentativeCnic,
        address: stepTwoFormValue.address
      };
      this.submitted = true;
      this.universityService.signupUser(signupObject)
        .subscribe(response => {
          if (response.status === 201) {
            this.loginForm.value.username = signupObject.username;
            this.loginForm.value.password = signupObject.password;
            this.signupForm.reset();
            this.stepTwoForm.reset();
            this.loginNotSignup = false;
            this.login(true);
          }},
          error => {
            this.stepTwoFormError=error.message;
            console.error(error);
          }
        );
    } else {
      this.stepTwoFormInvalid = true;
    }
  }

  getUniversityInfo(id: any) {
    this.universityService.getInfo
    .subscribe(response => {
      if(response.body)
      this.universityInstance=response.body;
      console.log(response);
    },
    error => {
      if(error)
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
