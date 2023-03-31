import { TestBed } from '@angular/core/testing';

import { IdlelogoutService } from './idlelogout.service';

describe('IdlelogoutService', () => {
  let service: IdlelogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdlelogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
