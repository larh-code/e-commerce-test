import { Injectable } from '@angular/core'

import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject } from 'rxjs'

import { ICategory } from '../header/models/category.model'
import {
  LocalStorageService,
  VarNameLocalStorage
} from '../shared/services/localStorage.service'
import { IProduct } from './models/product.model'
import {
  GetAllProductsUseCaseService
} from './use-cases/get-all-products-use-case/get-all-products-use-case.service'
import {
  GetProductByCategoryUseCaseService
} from './use-cases/get-product-by-category-use-case/get-product-by-category-use-case.service'
import {
  GetProductByIdUseCaseService
} from './use-cases/get-product-by-id-use-case/get-product-by-id-use-case.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSource = new BehaviorSubject<IProduct[]>([]);
  private searchSource = new BehaviorSubject<string>('');
  private categorySource = new BehaviorSubject<string>('');

  products$ = this.productsSource.asObservable();
  search$ = this.searchSource.asObservable();
  category$ = this.categorySource.asObservable();

  productOriginal: IProduct[] = [];
  productsFavorite = new Map();

  constructor(
    private getAllProductsUseCaseService: GetAllProductsUseCaseService,
    private getProductByCategoryUseCaseService: GetProductByCategoryUseCaseService,
    private getProductByIdUseCaseService: GetProductByIdUseCaseService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
  ) {
    this.localStorageService.loadDataLocal$.subscribe(() => this.checkFavoriteLocalStorage());
  }

  // obtener todos los productos
  getAllProduct() {
    this.getAllProductsUseCaseService.exec().subscribe(data => {
      this.productOriginal = data;
      this.productsSource.next(data);
    })
  }

  // obtener un producto por id
  getProduct(id: number) {
    return this.getProductByIdUseCaseService.exec(id);
  }

  // obtener todos los productos de una categoria
  getProductosByCategory(category: ICategory | null) {
    if (category) {
      this.categorySource.next(category.name);
      this.getProductByCategoryUseCaseService.exec(category.id).subscribe(data => {
        this.productOriginal = data;
        this.productsSource.next(data);
      })
    } else {
      this.categorySource.next('');
      this.getAllProduct();
    }
  }

  // ordenar todos los productos por el menor precio
  orderByMinor() {
    const newArray: IProduct[] = Object.assign([], this.productOriginal);
    const products = newArray.sort((a, b) => a.price - b.price);
    this.productsSource.next(products);
  }

  // ordenar todos los productos por el mayor precio
  orderByMajor() {
    const newArray: IProduct[] = Object.assign([], this.productOriginal);
    const products = newArray.sort((a, b) => b.price - a.price);
    this.productsSource.next(products);
  }

  // ordenar todos los productos por categoria
  orderByCategpory() {
    this.productsSource.next(this.productOriginal);
  }

  // ordenar todos los productos por favoritos
  orderByFavorite() {
    const newArray: IProduct[] = Object.assign([], this.productOriginal);
    const products = newArray.sort((a, b) => {
      if (this.checkProductFavorite(a.id)) {
        return -1;
      } else {
        return 1;
      }
    });
    this.productsSource.next(products);
  }

  // obtener todos los productos que coincidan con la busqueda
  getProductsBySearch(search: string) {
    this.searchSource.next(search);
    if (search.length) {
      const products = this.productOriginal.filter((product: any) => {
        if (product.title.toLowerCase().search(search.toLowerCase()) >= 0 || product.description.toLowerCase().search(search.toLowerCase()) >= 0) {
          return product;
        }
      });
      this.productsSource.next(products);
    } else {
      this.productsSource.next(this.productOriginal);
    }
  }

  // agregar/remover un producto favorito
  setProductoFavorite(productId: number) {
    if (this.productsFavorite.get(productId)) {
      this.productsFavorite.delete(productId);
      this.toastr.success('El producto fue removido de favoritos');
    } else {
      this.productsFavorite.set(productId, productId);
      this.toastr.success('El producto fue agregado a favoritos');
    }
    this.setFavoriteLocalStorage();
  }

  // verificar si el producto esta en favoritos
  checkProductFavorite(productId: number) {
    if (this.productsFavorite.get(productId)) {
      return true;
    }
    return false;
  }

  // guardar favoritos en el localstorage
  setFavoriteLocalStorage() {
    const fav: number[] = [];
    this.productsFavorite.forEach(id => fav.push(id));
    this.localStorageService.setDataLocalStorage(VarNameLocalStorage.fav, fav);
  }

  // verificar si hay data en el localstorage
  checkFavoriteLocalStorage() {
    const fav = this.localStorageService.getDataLocalStorage(VarNameLocalStorage.fav);
    if (fav) {
      for (const productId of fav) {
        this.productsFavorite.set(productId, productId);
      }
    }
  }
}
