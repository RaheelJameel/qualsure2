import { Component, OnInit, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TokenStorage } from '../token.storage';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { phoneMask, cnicMask, UnsavedChangesErrorMsg } from '../../common/constants';
import { HeaderFooterComponent } from '../../common/header-footer/header-footer.component';
import { EmptyStringValidator } from '../../common/validators/empty-string-validator';
import { ConfirmChangesComponent } from '../../common/modals/confirm-changes/confirm-changes.component';

import { UniversityService } from '../university.service';
import { University} from '../university';
import { ComponentCanDeactivate } from '../pending-changes-guard';
import { PageScrollConfig } from 'ng2-page-scroll';

@Component({
  selector: 'app-university-home',
  templateUrl: './university-home.component.html',
  styleUrls: ['./university-home.component.scss']
})
export class UniversityHomeComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
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
  hideEditForm: boolean;

  constructor(
    private fb: FormBuilder,
    private universityService: UniversityService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private token: TokenStorage,
    private header: HeaderFooterComponent,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
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
      name: new FormControl('', [Validators.required, EmptyStringValidator,Validators.pattern('^[A-Za-z][A-Za-z ]+$')]),
      username: new FormControl ('', [Validators.required, EmptyStringValidator,Validators.pattern('^[a-zA-Z0-9\\d\\-\\_]*$')]),
      email:  new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  createStepTwoForm() {
    this.stepTwoForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern('^\\+?[0-9]{2}\\s?\\([0-9]{3}\\)\\s?[0-9]{3}\\-[0-9]{4}$')]),
      universityRepresentativePhoneNumber: new FormControl('', [Validators.required,Validators.pattern('^\\+?[0-9]{2}\\s?\\([0-9]{3}\\)\\s?[0-9]{3}\\-[0-9]{4}$')]),
      universityRepresentativeCnic: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}\\-[0-9]{7}\\-[0-9]{1}$')]),
      universityRepresentativeName: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z][A-Za-z ]+$')]),
      address: new FormControl('',[Validators.required])
    });
  }

  login(fromSignup?: boolean) {
    if (!fromSignup) {
      this.loginNotSignup = true;
    }
    this.submitted = true;
    this.loginError = null;
    const loginFormValue = this.loginForm.value;
    const loginObject = {
      username: loginFormValue.username.trim(),
      password: loginFormValue.password,
    };
    window.scrollTo(0, 0);
    this.universityService.authenticate(loginObject)
    .subscribe(
      (response) => {
        if (response) {
          setTimeout(() => {
            this.loggedIn = true;
            this.stepTwo = false;
            this.getUniversityInfo(this.token.getId());
            this.signUpError = null;
            this.loginError = null;
            this.submitted = false;
            this.loginForm.reset();
          }, 1000);
        }
      },
      (error) => {
        this.submitted = false;
        console.error(error);
        if (fromSignup) {
          this.stepTwoFormError = error.message;
        } else {
          if (error.status === 0) {
            this.loginError = 'Connection Timed Out';
          } else if (error.error.error === 'Unauthorized' || error.status === 401) {
            this.loginError = 'Invalid username or password';
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
          (response) => {
            if (response.body.status === 'true') {
              if (response.body.success === 'true') {
                window.scrollTo(0, 0);
                this.stepTwo = true;
              } else {
                this.signUpError = 'Username already used please choose a different one';
              }
            } else {
              this.signUpError = response.body.errorMessage;
            }
          },
          (error) => {
            if (error.status === 0) {
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
      window.scrollTo(0, 0);
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
            console.log('Signup Error?:', error);
            if (error.status === 0) {
              this.stepTwoFormError = 'Connection Timed Out';
            } else if (error.error.status === 'false') {
              this.stepTwoFormError = error.error.errorMessage;
            } else {
              this.stepTwoFormError = error.message;
            }
            console.error(error);
            this.submitted = false;
          }
        );
    } else {
      this.stepTwoFormInvalid = true;
    }
  }

  getUniversityInfo(id: any) {
    console.log('getUniversityInfo: ');
    this.universityService.getInfo
    .subscribe(response => {
      if (response.body) {
        this.universityInstance = response.body;
        this.hideEditForm = (this.universityInstance.firstTime === 'False');
      }
      console.log(response);
      console.log('getUniversityInfo subscribe: this.hideEditForm: ', this.hideEditForm);
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

  redirectToAddDegree() {
    if (this.universityInstance.firstTime === 'True') {
      const modalRef: NgbModalRef = this.modalService.open(ConfirmChangesComponent, { backdrop: 'static', windowClass: 'align-modal' });
      modalRef.componentInstance.title = 'Important Information';
      modalRef.componentInstance.message = 'After adding your first degree the Edit-Form functionality will be permanently disabled. \
        Please ensure that you have customized the degree form as per your requirements before adding any degree.';
      modalRef.componentInstance.confirmButtonText = 'Proceed';
      modalRef.componentInstance.cancelButtonText = 'Back';
      modalRef.result.then(
        (result) => {
          if (result) {
            this.router.navigate(['university', 'add-degree']);
          }
        }, (reason) => {
          console.log(`Cancelled`);
        });
    } else {
      this.router.navigate(['university', 'add-degree']);
    }
    return false;
  }
  
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return !(this.signupForm.dirty || this.stepTwoForm.dirty);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = UnsavedChangesErrorMsg;
    }
  }
}
