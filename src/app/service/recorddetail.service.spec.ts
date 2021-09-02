import { TestBed } from '@angular/core/testing';

import { RecorddetailService } from './recorddetail.service';

describe('RecorddetailService', () => {
  let service: RecorddetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecorddetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
