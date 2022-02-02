import { TestBed } from '@angular/core/testing';

import { ProductMockRepositoryService } from './product-mock-repository.service';

describe('ProductMockRepositoryService', () => {
  let service: ProductMockRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMockRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
