import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import {
  CategoryMockRepositoryService
} from 'src/app/repository/category-mock-repository/category-mock-repository.service'

import { ICategory } from '../../models/category.model'

@Injectable({
  providedIn: 'root'
})
export class GetAllCategoryUseCaseService {

  constructor(
    private categoryMockRepositoryService: CategoryMockRepositoryService
  ) { }

  exec(): Observable<ICategory[]> {
    return this.categoryMockRepositoryService.getAllCategory();
  }
}
