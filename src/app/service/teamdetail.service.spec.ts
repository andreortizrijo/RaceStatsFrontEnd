import { TestBed } from '@angular/core/testing';

import { TeamdetailService } from './teamdetail.service';

describe('TeamdetailService', () => {
  let service: TeamdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
