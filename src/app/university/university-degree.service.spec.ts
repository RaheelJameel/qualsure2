import { TestBed, inject } from '@angular/core/testing';

import { UniversityDegreeService } from './university-degree.service';

describe('UniversityDegreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversityDegreeService]
    });
  });

  it('should be created', inject([UniversityDegreeService], (service: UniversityDegreeService) => {
    expect(service).toBeTruthy();
  }));
});
