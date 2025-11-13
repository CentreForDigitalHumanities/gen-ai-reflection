import { TestBed } from '@angular/core/testing';

import { AskForLeaveService } from './ask-for-leave.service';

describe('AskForLeaveService', () => {
  let service: AskForLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskForLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
