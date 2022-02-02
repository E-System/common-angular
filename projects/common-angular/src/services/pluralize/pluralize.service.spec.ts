import { TestBed } from '@angular/core/testing';

import { PluralizeService } from './pluralize.service';

describe('PluralizeService', () => {
  let service: PluralizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluralizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
