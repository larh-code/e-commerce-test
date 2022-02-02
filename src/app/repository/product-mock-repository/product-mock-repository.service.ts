import { Injectable } from '@angular/core'

import {
  from,
  map,
  Observable,
  of
} from 'rxjs'
import { filter } from 'rxjs/operators'

import { ProductsMock } from './product.data'
import { IProductMockEntity } from './product.entity'

@Injectable({
  providedIn: 'root'
})
export class ProductMockRepositoryService {

  productsData = ProductsMock;

  constructor() { }

  // obtener todos los productos
  getAllProduct(): Observable<IProductMockEntity[]> {
    return of(this.productsData);
  }

  // obtener un producto por id
  getProductById(id: number): Observable<IProductMockEntity> {
    return from(this.productsData)
      .pipe(filter((product) => String(product.id) === String(id)));
  }

  // obtener todos los productos por categoria
  getProductByCategory(categoryId: number): Observable<IProductMockEntity[]> {
    return of(this.productsData)
      .pipe(map(product => product.filter(prod => prod.categoryId === categoryId)));
  }
}
