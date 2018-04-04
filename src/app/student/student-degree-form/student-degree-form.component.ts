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
  universityName: string;
  degreeID: string;
  submitted: boolean;
  validDegree: boolean;
  invalidDegree: boolean;
  serverIp: string;
  qrCodeData: string;

  reloadedDegree: any;
  showDegreeForm: boolean;

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
    this.getOptionalDegreeDetails();
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  setUniversityID() {
    this.universityID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUniversityName();
    this.degreeID = this.activatedRoute.snapshot.paramMap.get('degreeId');
  }

  getUniversityName() {
    // this.universityName;
    console.log('Getting.......');
    return this.universityService.getSpecificUniveristyInfo(this.universityID)
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.universityName = response.body.name;
          }
        },
        (error) => {

        }
      );
  }

  getOptionalDegreeDetails() {
    if (this.degreeID) {
      this.studentService.getDegree(this.universityID, this.degreeID)
        .subscribe((response) => {
          console.log('getOptionalDegreeDetails :', response);
          //this.reloadedDegree = {"studentName":"a","gpa":"1","graduationYear":"1","degreeType":"a","degreeName":"a","CNIC":"11111-1111111-1","ABC":"11111-1111111-1"};
          if (response && response.degreeDetails && response.degreeDetails.universityId) {
            delete response.degreeDetails.universityId;
          }
          this.reloadedDegree = response.degreeDetails;
          this.showDegreeForm = true;
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.showDegreeForm = true;
    }
  }

  verifyDegree(degree) {
    window.scrollTo(0, 0);
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
              this.qrCodeData = this.serverIp + '/degree/' + this.universityID + '/' + response.degreeId;
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
