import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'

import { Subscription } from 'rxjs'

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
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
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

}
