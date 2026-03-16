import { TestBed } from '@angular/core/testing';

import { ObligatoireService } from './obligatoire.service';

describe('ObligatoireService', () => {
  let service: ObligatoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligatoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
