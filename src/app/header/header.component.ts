import {
  Component,
  OnInit
} from '@angular/core'

import {
  faBars,
  faShoppingCart,
  faTh
} from '@fortawesome/free-solid-svg-icons'

import { ProductService } from '../product/product.service'
import { HeaderService } from './header.service'
import { ICategory } from './models/category.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icons = {
    bars: faBars,
    shoppingCart: faShoppingCart,
    category: faTh,
  }
  timeOutSearch: any = null;
  searchValue: string = '';
  categories: ICategory[] = [];

  constructor(
    private productService: ProductService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.headerService.getAllCategory().subscribe(data => {
      this.categories = data;
    })
  }

  getProductByCategory(category: ICategory | null) {
    this.productService.getProductosByCategory(category);
  }

  searchProduct() {
    clearTimeout(this.timeOutSearch);
    this.timeOutSearch = setTimeout(() => {
      this.productService.getProductsBySearch(this.searchValue);
    }, 500);
  }

  cleanSearch() {
    this.searchValue = '';
    this.productService.getProductsBySearch(this.searchValue);
  }

}
