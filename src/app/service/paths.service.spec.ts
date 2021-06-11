import { TestBed } from '@angular/core/testing';

import { PathsService } from './paths.service';

describe('PathsService', () => {
  let service: PathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
