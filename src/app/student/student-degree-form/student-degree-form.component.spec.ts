import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeFormComponent } from './student-degree-form.component';

describe('StudentDegreeFormComponent', () => {
  let component: StudentDegreeFormComponent;
  let fixture: ComponentFixture<StudentDegreeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDegreeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
