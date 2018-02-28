import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversityService } from './university.service';
import { University} from './university';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TokenStorage } from './token.storage';
import { RouterModule, Routes } from '@angular/router';
import { HeaderFooterComponent } from '../common/header-footer/header-footer.component';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.universityService.authenticate(this.loginForm.value)
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

  signup(){
    this.signupForm.value.roles=["USER"];
    this.signupForm.value.active="true";
    console.log(this.signupForm.value);
    this.universityService.signupUser(this.signupForm.value)
    .subscribe(response => {
      console.log(response);
      console.log(response.status);

    if(response.status == 201){
      console.log(response.headers.status);
      this.loginForm.value.username=this.signupForm.value.username;
      this.loginForm.value.password=this.signupForm.value.password;
      this.login();
    }},
   error => {
         console.error(error)
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
