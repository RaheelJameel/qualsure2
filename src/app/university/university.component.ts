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
    this.createLoginForm();
    this.createSignupForm();
   }

  ngOnInit() {
    this.checkLoginStatus();
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
        this.router.navigate(['/university',this.token.getId()]); 
        this.loggedIn=true;
      }},
       error => {
         if(error.error.error == "Unauthorized" || error.error.status == 401) this.loginError="Invalid username or password";
         console.error(error)
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
  getUniversityInfo(id: number){
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
    if(this.universityService.checkLogin()){
      let checkId = this.activatedRoute.snapshot.toString().split("/");
      let id=+this.token.getId();
      console.log("in checking");
      if(+checkId[checkId.length - 1] == id ){
        
      }
      else{
        this.loggedIn=true;
        this.header.isLoggedIn=true;
        this.getUniversityInfo(id);
        this.router.navigate(['/university',id]); 
        console.log("correct");
      }
    }
    else{
      this.loggedIn=false;
    }
  }
}
