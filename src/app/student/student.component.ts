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
        console.log(response);
        this.universityList=response;
      }
    )
  }

  select(Sid: any){
    console.log(Sid);
     this.selectedUniversity= this.universityList.filter((list)=> list.id == Sid)
    console.log(this.selectedUniversity)
  }

  redirect(universityID: string) {
    this.router.navigate(['/degree', universityID]);
  }
}
