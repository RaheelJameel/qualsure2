import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UniversityService} from './university.service';
import {University} from './university';
import { Router, ActivatedRoute }            from '@angular/router';
import { Location } from '@angular/common';
import {TokenStorage} from "./token.storage";
import { RouterModule, Routes } from '@angular/router';
import {HeaderFooterComponent} from '../common/header-footer/header-footer.component'
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  universityInstance: University;
  loggedIn: boolean;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginError: string;
  constructor(private fb: FormBuilder, private universityService: UniversityService,private router:Router,
   private location: Location, private activatedRoute: ActivatedRoute, private token: TokenStorage, private header: HeaderFooterComponent) {
    this.universityInstance=null;
    this.checkLoginStatus();
    this.universityService.logoutObservable$.subscribe(data => {if(data) {this.loggedIn = false
    this.clearForms();
    }});
    this.createLoginForm();
    this.createSignupForm();
   }

  ngOnInit() {
  }
  clearForms() {
    this.loginForm.reset();
    this.signupForm.reset();
  }
  createLoginForm(){
    this.loginForm=this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }
  createSignupForm(){
    this.signupForm=this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.universityService.authenticate(this.loginForm.value)
    .subscribe(
      response => {
        console.log(response);
      if(response){
        this.loggedIn=true;
        console.log("logged in");
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
    this.universityService.getUniversityInfo(id)
    .subscribe(response => {
      this.universityInstance=response.body;
      console.log(response);
    },
    error => {
      console.error(error)
    });
  }
  checkLoginStatus(){
    
    console.log("correct");

    if(this.universityService.checkLogin()){
      
       this.loggedIn=true;
       this.getUniversityInfo(this.token.getId());
       
    }
    else{
      this.loggedIn=false;
       return false;
    }
  }
}
