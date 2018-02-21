import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityViewDegreesComponent } from './university-view-degrees.component';

describe('UniversityViewDegreesComponent', () => {
  let component: UniversityViewDegreesComponent;
  let fixture: ComponentFixture<UniversityViewDegreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityViewDegreesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityViewDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
