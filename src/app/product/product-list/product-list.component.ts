import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs'
import { ICategory } from 'src/app/header/models/category.model'
import {
  ShoppingCartService
} from 'src/app/shopping-cart/shopping-cart.service'

import { faStoreSlash } from '@fortawesome/free-solid-svg-icons'

import { IProduct } from '../models/product.model'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: IProduct[] = [];
  searchWord: string = '';
  categorySelected = '';
  private sub$ = new Subscription();

  orderByType = {
    major: 'MAJOR',
    minor: 'MINOR',
    category: 'Category',
  }
  orderBySel = '';
  icons = {
    listEmpty: faStoreSlash
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getProducts();
    this.subQueryParams();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  // subcribirse a los cambios de query
  subQueryParams() {
    this.sub$.add(
      this.route.queryParams.subscribe(params => {
        if (params['categoryid'] && params['categoryname'] && params['type'] === 'category') {
          this.getProductByCategory({ id: parseInt(params['categoryid']), name: params['categoryname'] });
        } else if (!params['categoryid'] && !params['categoryname'] && params['type'] === 'category') {
          this.getProductByCategory(null);
        } else if (params['search'] || !params['search'] && params['type'] === 'search') {
          this.searchProduct(params['search']);
        }
      })
    )
  }

  // obtener los productos de una categoria
  getProductByCategory(category: ICategory | null) {
    this.productService.getProductosByCategory(category);
  }

  // productos por buscador
  searchProduct(search: string) {
    this.productService.getProductsBySearch(search);
  }

  // cargar los productos
  private loadData(): void {
    this.productService.getAllProduct();
  }

  // obtener los productos
  getProducts() {
    this.sub$.add(
      this.productService.products$.subscribe(data => {
        this.products = data;
      })
    );
    this.sub$.add(
      this.productService.search$.subscribe(data => this.searchWord = data)
    );
    this.sub$.add(
      this.productService.category$.subscribe(data => this.categorySelected = data)
    );
  }

  // ordenar lista por precio o categoria
  orderBy(orderType: string) {
    switch(orderType) {
      case this.orderByType.minor:
        this.productService.orderByMinor();
        break;
      case this.orderByType.major:
        this.productService.orderByMajor();
        break;
      case this.orderByType.category:
        this.productService.orderByCategpory();
        break;
      default: 
        this.productService.orderByCategpory();
    }
  }

  // agregar/quitar un producto al carrito
  setProductToCart(product: IProduct) {
    this.shoppingCartService.setProductCart(product);
  }

}
