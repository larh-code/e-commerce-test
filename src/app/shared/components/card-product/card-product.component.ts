import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { Router } from '@angular/router'

import { IProduct } from 'src/app/product/models/product.model'
import { ProductService } from 'src/app/product/product.service'
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

  @Output() addFav: EventEmitter<number> = new EventEmitter<number>();
  @Output() addCart: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  icons = {
    favAdd: faHeart,
    favDel: heartSolid,
    cartPlus: faCartPlus,
  }
  productAddCart = false;
  productAddFav = false;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.checkProductCart();
    this.checkProductFavorite();
  }

  favoriteAdd() {
    this.addFav.emit(this.product.id);
    this.checkProductFavorite();
  }

  addCartFn() {
    this.addCart.emit(this.product);
    this.checkProductCart();
  }

  // verificar si el producto esta en el carrito
  checkProductCart() {
    this.productAddCart = this.shoppingCartService.checkProduct(this.product.id);
  }

  // verificar si el producto esta en favoritos
  checkProductFavorite() {
    this.productAddFav = this.productService.checkProductFavorite(this.product.id);
  }

  // ir a la vista de detalles del producto
  goToDetails() {
    this.router.navigate(['product', this.product.id]);
  }

}
