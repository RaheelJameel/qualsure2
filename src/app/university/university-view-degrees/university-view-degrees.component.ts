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
  degrees: any;
  formFieldUniKeys: any;
  formFieldUniValues: any;
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
  makeInitCapWithSpace(x): any{
    var initCap="";
   var lowerCase=0;
   for(var i=0; i<x.length; i++){
       if(x.charCodeAt(i)>90)
           lowerCase=1;
   }
   if(lowerCase===0)
       return x;
   if (x.charCodeAt(0)>90) {
    initCap=initCap.concat(String.fromCharCode(x.charCodeAt(0)-32));
   } else {
    initCap=initCap.concat(x.charAt(0));
   }
   var j=1;
   for(var i=1; i<x.length; i++){
       if(x.charCodeAt(i)<97) {
           initCap=initCap.concat(" ");
       }
       initCap=initCap.concat(x.charAt(i));
   }
   return initCap;

  }
  createFormFieldUni(): void{
    this.formFieldUniKeys = []; 
    this.formFieldUniValues = [];
    this.degrees.forEach((degree, index)=>{
      this.formFieldUniKeys[index]=Object.keys(degree.degreeDetails);
      if(this.formFieldUniKeys[index]["universityId"]){
        delete this.formFieldUniKeys[index]["universityId"];
      }
      this.formFieldUniValues[index]=[];
      this.formFieldUniKeys[index].forEach((key,index2) => {
        this.formFieldUniValues[index][index2] = degree.degreeDetails[key];
      });
      this.formFieldUniKeys[index]=this.formFieldUniKeys[index].map((key)=>{
        
        return this.makeInitCapWithSpace(key);
      })
      console.log("blaolaoalaoal");
      console.log(this.formFieldUniKeys[index]);
        })
  }

  getDegrees(): void {
    this.UniversitydegreeService.getDegrees()
    .subscribe(degrees => {
      console.log(degrees);
      this.degrees = degrees;
      this.createFormFieldUni();
      setTimeout(()=>{
        console.log("FormformFieldUniKeys",this.formFieldUniKeys );
        console.log("formFieldUniValues", this.formFieldUniValues );

      },3000)
    },
      error => {
        console.error(error);
      }
    );
  }
  getFormFields(): void {
    this.UniversitydegreeService.getFormFields.subscribe(
      response => {
        this.formFields=response.body;
        var temp={
          name: "Status"
        };
        this.formFields[this.formFields.length] =temp;
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
