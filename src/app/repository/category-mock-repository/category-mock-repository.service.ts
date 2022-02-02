import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryMock } from './category.data';
import { ICategoryMockEntity } from './category.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoryMockRepositoryService {

  categoryData = CategoryMock;

  constructor() { }

  // obtener todas las categorias
  getAllCategory(): Observable<ICategoryMockEntity[]> {
    return of(this.categoryData);
  }
}
