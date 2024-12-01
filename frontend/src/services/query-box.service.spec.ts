import { TestBed } from '@angular/core/testing';

import { QueryBoxService } from './query-box.service';

describe('QueryBoxService', () => {
  let service: QueryBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
