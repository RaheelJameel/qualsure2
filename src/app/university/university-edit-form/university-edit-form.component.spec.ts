import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityEditFormComponent } from './university-edit-form.component';

describe('UniversityEditFormComponent', () => {
  let component: UniversityEditFormComponent;
  let fixture: ComponentFixture<UniversityEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
