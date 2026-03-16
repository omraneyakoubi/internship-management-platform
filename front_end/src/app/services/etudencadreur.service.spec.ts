import { TestBed } from '@angular/core/testing';

import { EtudencadreurService } from './etudencadreur.service';

describe('EtudencadreurService', () => {
  let service: EtudencadreurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudencadreurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
