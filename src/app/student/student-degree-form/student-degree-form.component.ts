import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private universityService: UniversityService,
    private studentService: StudentService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
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
    this.studentService.verifyDegree(this.universityID, degree)
      .subscribe(response => {this.success('Sent for Verfication');
        if (response) {
        }
      },
      error => {
        this.error('Failled');
        console.error(error);
      });
  }

}
