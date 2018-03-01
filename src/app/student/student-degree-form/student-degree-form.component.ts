import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UniversityService } from '../../university/university.service';

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
  ) { }

  ngOnInit() {
    this.setUniversityID();
  }

  setUniversityID() {
    this.universityID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('213333333333333333333333:', this.universityID);
  }

}