import { Injectable } from '@angular/core';

export const DefaultFormArray: FieldGroup[] = [
  {
    name: 'StudentName',
    type: 'Text',
    validator: '[A-Za-z0-9]+',
    customError: 'Username is incorrect'
  },
  {
    name: 'GPA',
    type: 'Number',
    validator: '[0-4].?[0-9][0-9]',
    customError: 'GPA is incorrect'
  },
  {
    name: 'DegreeType',
    type: 'Text',
    validator: '[A-Za-z0-9]+',
    customError: 'DegreeType is incorrect'
  },
  {
    name: 'DegreeName',
    type: 'Text',
    validator: '[A-Za-z0-9]+',
    customError: 'DegreeName is incorrect'
  }
];

export interface FieldGroup {
  name: string;
  type: string;
  validator: string;
  customError: string;
}

@Injectable()
export class CommonService {

  private previousForm: FieldGroup[];

  constructor() { }

  getDefaultForm(): FieldGroup[] {
    return DefaultFormArray;
  }

  getForm(): FieldGroup[] {
    if (this.previousForm) {
      console.log('CommonService getForm(): giving Previous Form', this.previousForm);
      return this.previousForm;
    } else {
      console.log('CommonService getForm(): giving Default Form', this.getDefaultForm());
      return this.getDefaultForm();
    }
  }

  setForm(newForm: FieldGroup[]) {
    this.previousForm = newForm;
  }

  clearForm() {
    this.previousForm = null;
  }

}
