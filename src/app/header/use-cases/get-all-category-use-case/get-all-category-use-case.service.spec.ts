import { TestBed } from '@angular/core/testing';

import { GetAllCategoryUseCaseService } from './get-all-category-use-case.service';

describe('GetAllCategoryUseCaseService', () => {
  let service: GetAllCategoryUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllCategoryUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
