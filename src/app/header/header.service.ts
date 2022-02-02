import { Injectable } from '@angular/core'

import {
  GetAllCategoryUseCaseService
} from './use-cases/get-all-category-use-case/get-all-category-use-case.service'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private getAllCategoryUseCaseService: GetAllCategoryUseCaseService
  ) { }

  getAllCategory() {
    return this.getAllCategoryUseCaseService.exec();
  }
}
