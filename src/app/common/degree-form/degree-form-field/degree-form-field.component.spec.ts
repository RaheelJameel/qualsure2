import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeFormFieldComponent } from './degree-form-field.component';

describe('DegreeFormFieldComponent', () => {
  let component: DegreeFormFieldComponent;
  let fixture: ComponentFixture<DegreeFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
