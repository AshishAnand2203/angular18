import { TestBed } from '@angular/core/testing';

import { WorkItemsApiService } from './work-items-api.service';

describe('WorkItemsApiService', () => {
  let service: WorkItemsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkItemsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
