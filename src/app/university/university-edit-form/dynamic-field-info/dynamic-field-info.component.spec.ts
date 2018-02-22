import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldInfoComponent } from './dynamic-field-info.component';

describe('DynamicFieldInfoComponent', () => {
  let component: DynamicFieldInfoComponent;
  let fixture: ComponentFixture<DynamicFieldInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFieldInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
