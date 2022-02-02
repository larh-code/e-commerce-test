import { TestBed } from '@angular/core/testing';

import { GetProductByIdUseCaseService } from './get-product-by-id-use-case.service';

describe('GetProductByIdUseCaseService', () => {
  let service: GetProductByIdUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductByIdUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
