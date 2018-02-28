import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UniversityService } from '../university.service';
import { FieldGroupAPI } from '../../services/common.service';
import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

@Component({
  selector: 'app-university-add-degree',
  templateUrl: './university-add-degree.component.html',
  styleUrls: ['./university-add-degree.component.scss']
})
export class UniversityAddDegreeComponent implements OnInit {

  uniID: string;

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private alertService: AlertService
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
    this.universityService.addDegree(degree)
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
  }

}
