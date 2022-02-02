import { Location } from '@angular/common'
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs'

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

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    })
  }

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    })
  }

  goBack() {
    this.location.back();
  }

}
