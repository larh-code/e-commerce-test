import { TestBed } from '@angular/core/testing';

import { CategoryMockRepositoryService } from './category-mock-repository.service';

describe('CategoryMockRepositoryService', () => {
  let service: CategoryMockRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryMockRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
