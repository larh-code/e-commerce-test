import { Location } from '@angular/common'
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'

import { Subscription } from 'rxjs'

import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowLeft,
  faCartArrowDown
} from '@fortawesome/free-solid-svg-icons'

import { IProduct } from '../product/models/product.model'
import { ICart } from './models/cart.model'
import { ShoppingCartService } from './shopping-cart.service'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  icons = {
    back: faArrowLeft,
    addCart: faCartArrowDown,
    creditCard: faCreditCard,
  }
  cart: ICart;
  sub$ = new Subscription();

  constructor(
    private location: Location,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.loadCartData();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  // cargar los productos del carrito de compras
  loadCartData() {
    this.sub$.add(
      this.shoppingCartService.cart$.subscribe(data => {
        this.cart = data;
      })
    )
  }

  // remover un producto del carrito de compras
  removeProduct(product: IProduct) {
    this.shoppingCartService.setProductCart(product);
  }

  // regresar a la pagina anterior
  goBack() {
    this.location.back();
  }

}
