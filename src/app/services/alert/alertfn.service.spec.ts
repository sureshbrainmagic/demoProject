import { TestBed } from '@angular/core/testing';

import { AlertfnService } from './alertfn.service';

describe('AlertfnService', () => {
  let service: AlertfnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertfnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
