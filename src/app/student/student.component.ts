import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  filterVar: string;
  universityList: Array<any>;
  selectedUniversity:any;
  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUniversitiesList();
  }
  getUniversitiesList() {
    this.studentService.getListOfUniversities().subscribe(
      response => {
        this.universityList=response;
       
      }
    )
  }

  select(Sid: any) {
     this.selectedUniversity = this.universityList.filter((list)=> list.id == Sid)
  }

  redirect(universityID: string) {
    this.router.navigate(['/degree', universityID]);
  }
}
