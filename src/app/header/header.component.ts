import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'

import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import {
  faBars,
  faLightbulb as faLightbulbDark,
  faShoppingCart,
  faTh
} from '@fortawesome/free-solid-svg-icons'

import { ProductService } from '../product/product.service'
import {
  LocalStorageService,
  VarNameLocalStorage
} from '../shared/services/localStorage.service'
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service'
import { HeaderService } from './header.service'
import { ICategory } from './models/category.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  icons = {
    bars: faBars,
    shoppingCart: faShoppingCart,
    category: faTh,
    sunLight: faLightbulb,
    sunLightDark: faLightbulbDark,
  }
  timeOutSearch: any = null;
  searchValue: string = '';
  categories: ICategory[] = [];
  cartCount = 0;
  sub$ = new Subscription();
  themeDark = false;

  constructor(
    private productService: ProductService,
    private headerService: HeaderService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private localStorageService: LocalStorageService,
  ) {
    this.sub$.add(
      this.localStorageService.loadDataLocal$.subscribe(() => this.checkStylethemeLocalStorage())
    )
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getCartCount();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  // cargar la cantidad de productos en el carrito
  getCartCount() {
    this.sub$.add(
      this.shoppingCartService.cartCount$.subscribe(count => this.cartCount = count)
    )
  }

  // obtener todas las categorias
  getAllCategory() {
    this.headerService.getAllCategory().subscribe(data => {
      this.categories = data;
    })
  }

  // filtrar lista por categoria
  getProductByCategory(category: ICategory | null) {
    if (category) {
      this.router.navigate([''], { queryParams: { categoryid: category?.id || '', categoryname: category?.name || '', type: 'category' } });
    } else {
      this.router.navigate([''], { queryParams: { type: 'category' } });
    }
  }

  // filtrar lista por buscador
  searchProduct() {
    clearTimeout(this.timeOutSearch);
    this.timeOutSearch = setTimeout(() => {
      this.router.navigate([''], { queryParams: { search: this.searchValue, type: 'search' } });
    }, 500);
  }

  // limpiar buscador
  cleanSearch() {
    this.searchValue = '';
    this.productService.getProductsBySearch(this.searchValue);
  }

  // ir a la vista del carrito de compras
  goToCart() {
    this.router.navigate(['shopping-cart']);
  }

  // cambiar tema
  toggleTheme(dark: boolean) {
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');      
    }
    this.themeDark = dark;
    this.localStorageService.setDataLocalStorage(VarNameLocalStorage.styleTheme, this.themeDark);
  }

  // verificar configuracion de tema en el localstorage
  checkStylethemeLocalStorage() {
    const themeLocal = this.localStorageService.getDataLocalStorage(VarNameLocalStorage.styleTheme);
    this.themeDark = themeLocal || false;
    this.toggleTheme(this.themeDark);
  }

}
