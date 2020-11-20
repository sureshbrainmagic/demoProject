import { TestBed } from '@angular/core/testing';

import { ErrormsgService } from './errormsg.service';

describe('ErrormsgService', () => {
  let service: ErrormsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrormsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
