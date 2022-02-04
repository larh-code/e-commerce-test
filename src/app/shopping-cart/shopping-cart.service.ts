import { Injectable } from '@angular/core'

import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject } from 'rxjs'

import { IProduct } from '../product/models/product.model'
import { ICart } from './models/cart.model'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  cart: ICart = {
    products: [],
    total: 0
  };
  cartCount: number = 0;
  cartProducts = new Map();

  private cartSource = new BehaviorSubject<ICart>(this.cart)
  private cartCountSource = new BehaviorSubject<number>(this.cartCount)
  
  cart$ = this.cartSource.asObservable();
  cartCount$ = this.cartCountSource.asObservable();

  constructor(
    private toastr: ToastrService
  ) { }

  // agregar o remover producto del carrito
  setProductCart(product: IProduct) {
    if (this.cartProducts.get(product.id)) {
      this.cartProducts.delete(product.id);
      this.toastr.success('El producto fue removido del carrito');
    } else {
      this.cartProducts.set(product.id, product);
      this.toastr.success('El producto fue agregado al carrito');
    }
    this.setCart();
  }

  // calcular el precio total y setear el observador
  private setCart() {
    const productSelected: IProduct[] = [];
    let total = 0;
    this.cartProducts.forEach(product => {
      productSelected.push(product);
      total += product.price;
    });
    this.cart.products = productSelected;
    this.cart.total = total;
    this.cartSource.next(this.cart);
    this.cartCountSource.next(productSelected.length);
  }

  // verificar si un producto esta en el carrito
  checkProduct(productId: number) {
    if (this.cartProducts.get(productId)) {
      return true;
    }
    return false;
  }
}
