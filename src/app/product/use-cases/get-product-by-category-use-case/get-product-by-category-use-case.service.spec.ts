import { TestBed } from '@angular/core/testing';

import { GetProductByCategoryUseCaseService } from './get-product-by-category-use-case.service';

describe('GetProductByCategoryUseCaseService', () => {
  let service: GetProductByCategoryUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductByCategoryUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
