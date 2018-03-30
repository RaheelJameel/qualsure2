import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

import { UniversityService } from '../../university/university.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-degree-form',
  templateUrl: './student-degree-form.component.html',
  styleUrls: ['./student-degree-form.component.scss']
})
export class StudentDegreeFormComponent implements OnInit {

  universityID: string;
  submitted: boolean;
  validDegree: boolean;
  invalidDegree: boolean;
  serverIp: string;
  qrCodeData: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private universityService: UniversityService,
    private studentService: StudentService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getFile();
    this.setUniversityID();
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  setUniversityID() {
    this.universityID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  verifyDegree(degree) {
    this.submitted = true;
    this.validDegree = false;
    this.invalidDegree = false;
    this.studentService.verifyDegree(this.universityID, degree)
      .subscribe(response => {
        if (response && response.status) {
          if (response.status === 'Success') {
            setTimeout(() => {
              this.validDegree = true;
              this.success('Verified');
              this.qrCodeData = this.serverIp + '/degree/' + this.universityID + '/' + '568522465';
              // setTimeout(() => {
              //   this.router.navigate(['/degree']);
              // }, 3000);
            }, 2000);
          } else {
            setTimeout(() => {
              this.invalidDegree = true;
              this.error('Verification Failed');
            }, 2000);
          }
        }
      },
      error => {
        console.error(error);
      });
  }

  getFile() {
    fetch('/assets/server-ip.txt')
      .then(response => response.text())
      .then((inputString) => {
        const inputArray = inputString.split('\n');
        this.serverIp = inputArray[0];
      });
  }

}
