import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-degree-form-field',
  templateUrl: './degree-form-field.component.html',
  styleUrls: ['./degree-form-field.component.scss']
})
export class DegreeFormFieldComponent implements OnInit {

  @Input() fieldControl: FormControl;
  @Input() label = 'Field Name';
  @Input() errorMessage = 'Field has Error';
  @Input() type = 'text';
  @Input() id = 0;

  constructor() { }

  ngOnInit() {
  }

}
