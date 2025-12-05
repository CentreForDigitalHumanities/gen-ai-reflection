import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { toolStartedGuard } from './tool-started.guard';

describe('toolStartedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => toolStartedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
