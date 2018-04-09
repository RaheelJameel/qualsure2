import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PapaParseService } from 'ngx-papaparse';
import { UniversityService } from '../university.service';
import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PasswordDialogComponent } from '../../common/modals/password-dialog/password-dialog.component';
@Component({
  selector: 'app-university-multiple-add-degree',
  templateUrl: './university-multiple-add-degree.component.html',
  styleUrls: ['./university-multiple-add-degree.component.scss']
})
export class UniversityMultipleAddDegreeComponent implements OnInit {

  uniID: any;
  formFields: any;
  parsedData:any;
  errors: any;
  degreesArray:Array<any>;
  validated: boolean;
  submitted: boolean;
  errorMessage: string;
  submissionFailed: boolean;
  noFile = true;
  
  constructor(
    private router: Router,
    private papa: PapaParseService,
    private universityService: UniversityService,
    private modalService: NgbModal,
  ) {
      this.validated=false;
     }

  ngOnInit() {
    this.checkUniInfoAndGetFormField();

  }
  public changeListener(files: FileList){
    if(files && files.length > 0) {
      this.noFile=false;
       let file : File = files.item(0);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result;
           this.parser(csv);
         }
      }
  }
  checkUniInfoAndGetFormField() {
    this.universityService.getInfo
      .subscribe(response => {
        if (response.body) {
          this.uniID = this.universityService.university.accountId;
          this.getFormFields();

        }
      },
      error => {
      });
  }
  parser(data:any){
    this.papa.parse(data,{
      complete: (results, file) => {
        this.parsedData=results;

        this.equalFormFields();
      }
  });
  }
  equalFormFields(){
    this.compareFormFields.subscribe(
      response =>{
        if(!response){
          this.errors=["The file doesn't have the same columns"];
          return;
        }
        var errors=[];
      
        var regularExps=this.getReularExps();
        this.parsedData.data.shift();
        
        this.parsedData.data.forEach((element,i) => {
          element.forEach((element2,j) => {
        
            if(!RegExp(regularExps[j]).test(element2))
            {
           
              errors.push({row:i+2,column:j+1});
            }
            
          });
        });
        if(errors.length !== 0){
          this.errors=errors;
        }
        if(errors.length === 0){
          this.errors=null;
          this.makeDegreesArray();
        }
      }
    )
  } 
  makeDegreesArray(){
    this.degreesArray=[];
    this.parsedData.data.forEach((element,i) => {
        
        const degreeObject = {
          studentName: element[0],
          gpa: element[1],
          graduationYear: element[2],
          degreeType: element[3],
          degreeName: element[4]
        };
        for (let j = 5; j < element.length; j++) {
          degreeObject[this.formFields[j].name] =element[j];
        }
        if(degreeObject.studentName !== '' && degreeObject.gpa !== '' && degreeObject.graduationYear !== '' && degreeObject.degreeType !== '' && degreeObject.degreeName )
          this.degreesArray.push(degreeObject);

      
    });
    this.validated=true;
  }


  submitDegrees() {
    this.modalService.open(PasswordDialogComponent, { backdrop: 'static', windowClass: 'align-modal' }).result
      .then((result) => {
        this.submitted = true;
        const degreeObj = { degreeDetails: this.degreesArray };
        this.universityService.addMultipleDegrees(degreeObj, result)
          .subscribe(
            (response) => {
              if (response.body.status === 'false') {
                this.errorMessage = response.body.errorMessage;
                this.submissionFailed = true;
              } else {
                setTimeout(() => {
                  this.router.navigate(['/university']);
                }, 3000);
              }
            },
            (error) => {
              if (error.status === 0) {
                this.errorMessage = 'Connection Timed Out';
                this.submissionFailed = true;
              }
            }
        );
      }, (reason) => {});
  }


  getReularExps () :any{
    
    var regularExps=[];
    this.formFields.forEach(element => {
      regularExps.push(element.validators[0].regex);
    });
    return regularExps;
  }

  getFormFields(): void {
    this.universityService.getFormFields(this.uniID,true).subscribe(
      response => {
        this.formFields=response.formFields;
        var temp={
          name: "Status"
        };
      },
      error => {
      }
    )
  }
  compareFormFields =  new Observable<boolean>((observer) => {    
    var check =true;
    this.formFields.forEach((element,i) => {
      if( this.parsedData.data[0].length !== this.formFields.length)
      {
        observer.next(false);
        observer.complete();
      }
      if(element.name.toLowerCase() !== this.parsedData.data[0][i].toLowerCase()){
        observer.next(false);
        observer.complete();
      }
    });
    observer.next(check);
    observer.complete();
  })
  goBack() {
    this.validated=false;
    this.parsedData=null;
    this.noFile=true;
    this.submitted = false;
    this.submissionFailed = false;
    this.errorMessage = null;
    window.scrollTo(0, 0);
  }
}
