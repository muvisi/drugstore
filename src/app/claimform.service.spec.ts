import { TestBed } from '@angular/core/testing';

import { ClaimformService } from './claimform.service';

describe('ClaimformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimformService = TestBed.get(ClaimformService);
    expect(service).toBeTruthy();
  });
});
