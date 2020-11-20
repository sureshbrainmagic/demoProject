import { TestBed } from '@angular/core/testing';

import { GpspermissionService } from './gpspermission.service';

describe('GpspermissionService', () => {
  let service: GpspermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpspermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
