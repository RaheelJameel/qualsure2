import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UniversityService } from '../university.service';
import { ComponentCanDeactivate } from '../pending-changes-guard';

import { FieldGroupAPI } from '../../services/common.service';
import { UnsavedChangesErrorMsg } from '../../common/constants';
import { PasswordDialogComponent } from '../../common/modals/password-dialog/password-dialog.component';

import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

@Component({
  selector: 'app-university-add-degree',
  templateUrl: './university-add-degree.component.html',
  styleUrls: ['./university-add-degree.component.scss']
})
export class UniversityAddDegreeComponent implements OnInit, ComponentCanDeactivate {

  uniID: string;
  isFormDity: boolean;
  bypassConfirmChangesCheck: boolean;

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private alertService: AlertService,
    private modalService: NgbModal,
  ) { }

  success(message: string) {
    this.alertService.success(message);
}

  error(message: string) {
    this.alertService.error(message);
  }

  ngOnInit() {
    this.checkUniInfoAndGetFormField();
  }

  checkUniInfoAndGetFormField() {
    this.universityService.getInfo
      .subscribe(response => {
        if (response.body) {
          this.uniID = this.universityService.university.accountId;
        }
      },
      error => {
        console.error(error);
      });
  }

  addDegree(degree) {
    this.bypassConfirmChangesCheck = true;
    this.modalService.open(PasswordDialogComponent, { backdrop: 'static', windowClass: 'align-modal' }).result
      .then((result) => {
        console.log(`Password Entered: ${result}`);
        this.universityService.addDegree(degree,result)
          .subscribe(
          response => {
          if (response) {
            this.success('Degree Added Successfully');
            setTimeout(() => {
              this.router.navigate(['/university']);
            }, 3000);
          }},
          error => {
            console.error(error);
            this.error('Operation Failed');
          }
        );
      }, (reason) => {
        console.log(`Cancelled`);
      });
    
  }

  promptPassword() {
    console.log('promptPassword');
    this.modalService.open(PasswordDialogComponent, { backdrop: 'static', windowClass: 'align-modal' }).result
      .then((result) => {
        console.log(`Password Entered: ${result}`);
      }, (reason) => {
        console.log(`Cancelled`);
      });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return this.bypassConfirmChangesCheck || !this.isFormDity;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = UnsavedChangesErrorMsg;
    }
  }

}
