import { TestBed } from '@angular/core/testing';

import { LoginstatecontrolService } from './loginstatecontrol.service';

describe('LoginstatecontrolService', () => {
  let service: LoginstatecontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginstatecontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
