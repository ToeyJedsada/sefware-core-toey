import { TestBed, inject } from '@angular/core/testing';

import { uomService } from './uom.service';

describe('UomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [uomService]
    });
  });

  it('should be created', inject([uomService], (service: uomService) => {
    expect(service).toBeTruthy();
  }));
});
