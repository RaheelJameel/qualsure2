import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeFormComponent } from './degree-form.component';

describe('DegreeFormComponent', () => {
  let component: DegreeFormComponent;
  let fixture: ComponentFixture<DegreeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
