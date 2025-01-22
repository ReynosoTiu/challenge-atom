import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasloggedGuard } from './haslogged.guard';

describe('hasloggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasloggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
