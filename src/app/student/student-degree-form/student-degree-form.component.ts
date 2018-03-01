import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit() {
    this.setUniversityID();
  }

  setUniversityID() {
    this.universityID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  verifyDegree(degree) {
    this.studentService.verifyDegree(this.universityID, degree)
      .subscribe(response => {
        if (response) {
        }
      },
      error => {
        console.error(error);
      });
  }

}
