import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import {
  ProductMockRepositoryService
} from 'src/app/repository/product-mock-repository/product-mock-repository.service'

import { IProduct } from '../../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class GetProductByIdUseCaseService {

  constructor(
    private productMockRepositoryService: ProductMockRepositoryService
  ) { }

  exec(id: number): Observable<IProduct> {
    return this.productMockRepositoryService.getProductById(id);
  }
}
