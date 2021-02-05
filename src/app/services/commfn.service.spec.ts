import { TestBed } from '@angular/core/testing';

import { CommfnService } from './commfn.service';

describe('CommfnService', () => {
  let service: CommfnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommfnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
