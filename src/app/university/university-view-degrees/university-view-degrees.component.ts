import { Component, OnInit } from '@angular/core';
import {Degree} from '../degree';
import {UniversityDegreeService} from '../university-degree.service';
import {Router} from '@angular/router';
import { CollapseDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-university-view-degrees',
  templateUrl: './university-view-degrees.component.html',
  styleUrls: ['./university-view-degrees.component.scss']
})
export class UniversityViewDegreesComponent implements OnInit {

  filterVar: string;
  degrees: Degree[];
  formFields: any;
  degreeDetail: Degree;
  rowCollapsed: boolean;
  expandedIndex:any;
  constructor(private UniversitydegreeService: UniversityDegreeService,
              private router: Router) {
                this.rowCollapsed=true;
                this.expandedIndex=-1;
               }

  ngOnInit() {
    this.getFormFields();
     this.getDegrees();
  }
  // goToDetail(id: number): void {
  //   this.router.navigateByUrl('university/detail/' + id);

  // }

  getDegrees(): void {
    this.UniversitydegreeService.getDegrees()
    .subscribe(degrees => {
      console.log(degrees);
      this.degrees = degrees},
      error => {
        console.error(error);
      }
    );
  }
  getFormFields(): void {
    this.UniversitydegreeService.getFormFields.subscribe(
      response => {
        this.formFields=response.body;
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }
  goToDetail(id): void{
    if(this.rowCollapsed){
      if(this.degreeDetail != null){

        if(id != this.degreeDetail.id){
          this.UniversitydegreeService.getDegree(id).subscribe(
            response => {
              this.degreeDetail=response;
            }
          )
        }
        this.expandedIndex = id === this.expandedIndex ? -1 : id;
      }
      else{
        this.UniversitydegreeService.getDegree(id).subscribe(
          response => {
            this.degreeDetail=response;
            this.rowCollapsed=!this.rowCollapsed;
            this.expandedIndex = id === this.expandedIndex ? -1 : id;
          }
        )
      }
    }
    else {

      this.rowCollapsed=true;}
  }
  expandRow(index: number): void {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
}
