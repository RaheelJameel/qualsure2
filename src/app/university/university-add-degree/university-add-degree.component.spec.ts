import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityAddDegreeComponent } from './university-add-degree.component';

describe('UniversityAddDegreeComponent', () => {
  let component: UniversityAddDegreeComponent;
  let fixture: ComponentFixture<UniversityAddDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityAddDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityAddDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
