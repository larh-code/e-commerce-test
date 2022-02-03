import { Location } from '@angular/common'
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs'
import {
  ShoppingCartService
} from 'src/app/shopping-cart/shopping-cart.service'

import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowLeft,
  faCartPlus,
  faHeart as heartSolid
} from '@fortawesome/free-solid-svg-icons'

import { IProduct } from '../models/product.model'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  icons = {
    back: faArrowLeft,
    favAdd: faHeart,
    favDel: heartSolid,
    cartPlus: faCartPlus,
  }
  productId: number;
  product: IProduct;
  private sub$ = new Subscription();
  productAddCart = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
  ) {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.productId = params['id'];
      })
    )
  }

  ngOnInit(): void {
    this.getProduct();
    this.checkProductCart();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  // obtener detalles del producto
  getProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    })
  }

  // agregar/quitar un producto al carrito
  setProductToCart() {
    this.shoppingCartService.setProductCart(this.product);
    this.checkProductCart();
  }

  // verificar si el producto esta en el carrito
  checkProductCart() {
    this.productAddCart = this.shoppingCartService.getProduct(this.product.id);
  }

  // regresar a la pagina anterior
  goBack() {
    this.location.back();
  }

}
