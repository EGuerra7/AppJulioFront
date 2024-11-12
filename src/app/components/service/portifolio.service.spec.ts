import { TestBed } from '@angular/core/testing';

import { PortifolioService } from './portifolio.service';

describe('PortifolioService', () => {
  let service: PortifolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortifolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
