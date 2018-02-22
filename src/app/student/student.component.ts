import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  universityList: Array<any>;
  constructor(private studentService: StudentService) {
    this.universityList=[
      {"name" : "GIKI",
      "id" : "124a"},
      {"name" : "Lums",
      "id" : "125a"},
      {"name" : "IBA",
      "id" : "126a"},
      {"name" : "NED",
      "id" : "127a"},
      {"name" : "Nust",
      "id" : "128v"},
    ];
    console.log(this.universityList);
    }
   

  ngOnInit() {
    this.getUniversitiesList()
  }
  getUniversitiesList(){
    this.studentService.getListOfUniversities().subscribe(
      response => {
        this.universityList=response;
      }
    )
  }

  select(id: any){
    this.studentService.getFormFields(id).subscribe(
    (formFields) =>{
      
    }
    );
  }
}
