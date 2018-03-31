import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityWalletComponent } from './university-wallet.component';

describe('UniversityWalletComponent', () => {
  let component: UniversityWalletComponent;
  let fixture: ComponentFixture<UniversityWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
