import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityMultipleAddDegreeComponent } from './university-multiple-add-degree.component';

describe('UniversityMultipleAddDegreeComponent', () => {
  let component: UniversityMultipleAddDegreeComponent;
  let fixture: ComponentFixture<UniversityMultipleAddDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityMultipleAddDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityMultipleAddDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
