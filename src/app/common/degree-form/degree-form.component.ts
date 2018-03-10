import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UniversityService } from '../../university/university.service';
import { StudentService } from '../../student/student.service';

import { CommonService, FieldGroup, FieldValidator, FieldGroupAPI } from '../../services/common.service';
import { EmptyStringValidator } from '../validators/empty-string-validator';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.scss']
})
export class DegreeFormComponent implements OnInit {

  @Input() uniID: string;
  @Input() buttonLabel = 'Add';
  @Input() independentCheck: boolean;
  @Output() outputValue = new EventEmitter<any>();
  @Output() dirtyFormOutput = new EventEmitter<boolean>();
  dityFormSubscription: Subscription;
  formFields: FieldGroupAPI[];
  fieldForm: FormGroup;
  formInvalid: boolean;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.fieldForm = new FormGroup({
      fieldArray: new FormArray([]),
    });
    this.getFormFieldsAndMakeForm();
    this.emitFormDirtyValue();
  }

  getFormFieldsAndMakeForm() {
    if (!this.independentCheck) {
      this.universityService.getFormFields(this.uniID, this.independentCheck)
        .subscribe((response) => {
          if (response.body) {
            this.formFields = response.body;
            this.makeForm();
          }},
          error => {
            console.error(error);
          }
        );
    } else {
      this.studentService.getFormFields(this.uniID)
        .subscribe((response) => {
        //    console.log('1111111111111', response);
          if (response) {
            this.formFields = response.formFields;
            this.makeForm();
          }},
          error => {
            console.error(error);
          }
        );
    }
  }

  emitFormDirtyValue() {
    this.dityFormSubscription = this.fieldForm.valueChanges.subscribe(() => {
      this.dirtyFormOutput.emit(this.fieldForm.dirty);
      if (this.fieldForm.dirty) {
        this.dityFormSubscription.unsubscribe();
      }
    });
  }

  get formFieldArray(): FormArray {
    return this.fieldForm.get('fieldArray') as FormArray;
  }

  makeForm() {
    this.formFields.forEach((fieldGroup: FieldGroupAPI) => {
      this.formFieldArray.push(
          new FormControl('', [Validators.required, EmptyStringValidator])
      );
    });
  }

  giveOutput() {
    this.formInvalid = false;
    if (this.fieldForm.valid) {
      const formValue: any[] = this.fieldForm.getRawValue()['fieldArray'];
      const degreeObject = {
        studentName: formValue[0].trim(),
        gpa: formValue[1].trim(),
        graduationYear: formValue[2].trim(),
        degreeType: formValue[3].trim(),
        degreeName: formValue[4].trim()
      };
      for (let i = 5; i < formValue.length; i++) {
        degreeObject[this.formFields[i].name] = formValue[i].trim();
      }
      console.log('giveOutput:', degreeObject);
      this.outputValue.emit(degreeObject);
      // this.router.navigate(['/university']);
    } else {
      this.formInvalid = true;
    }
  }

}
