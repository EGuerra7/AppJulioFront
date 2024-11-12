import { TestBed } from '@angular/core/testing';

import { AdmAuthService } from './adm-auth.service';

describe('AdmAuthService', () => {
  let service: AdmAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
