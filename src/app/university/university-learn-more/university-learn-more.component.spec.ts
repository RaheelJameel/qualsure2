import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityLearnMoreComponent } from './university-learn-more.component';

describe('UniversityLearnMoreComponent', () => {
  let component: UniversityLearnMoreComponent;
  let fixture: ComponentFixture<UniversityLearnMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityLearnMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
