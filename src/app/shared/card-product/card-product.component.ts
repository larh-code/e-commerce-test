import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { Router } from '@angular/router'

import { IProduct } from 'src/app/product/models/product.model'
import {
  ShoppingCartService
} from 'src/app/shopping-cart/shopping-cart.service'

import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faCartPlus,
  faHeart as heartSolid
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() product: IProduct;

  @Output() favAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addCart: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  icons = {
    favAdd: faHeart,
    favDel: heartSolid,
    cartPlus: faCartPlus,
  }
  productAddCart = false;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.checkProductCart();
  }

  favoriteAdd() {
    console.log('fav add')
    this.favAction.emit(true);
  }

  favoriteDel() {
    console.log('fav del')
    this.favAction.emit(false);
  }

  addCartFn() {
    this.addCart.emit(this.product);
    this.checkProductCart();
  }

  // verificar si el producto esta en el carrito
  checkProductCart() {
    this.productAddCart = this.shoppingCartService.getProduct(this.product.id);
  }

  goToDetails() {
    this.router.navigate(['product', this.product.id]);
  }

}
