import { TestBed } from '@angular/core/testing';

import { GetAllProductsUseCaseService } from './get-all-products-use-case.service';

describe('GetAllProductsUseCaseService', () => {
  let service: GetAllProductsUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllProductsUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
