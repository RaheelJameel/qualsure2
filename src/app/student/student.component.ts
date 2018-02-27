import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  universityList: Array<any>;
  selectedUniversity:any;
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
    this.selectedUniversity={};
    console.log(this.universityList);
    }
   

  ngOnInit() {
    this.getUniversitiesList()
  }
  getUniversitiesList(){
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
    
  
}
