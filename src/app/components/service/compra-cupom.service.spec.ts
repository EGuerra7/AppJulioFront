import { TestBed } from '@angular/core/testing';

import { CompraCupomService } from './compra-cupom.service';

describe('CompraCupomService', () => {
  let service: CompraCupomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraCupomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
