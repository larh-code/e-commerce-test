import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { Router } from '@angular/router'

import { IProduct } from 'src/app/product/models/product.model'

import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-card-product-cart',
  templateUrl: './card-product-cart.component.html',
  styleUrls: ['./card-product-cart.component.scss']
})
export class CardProductCartComponent implements OnInit {

  @Input() product: IProduct;

  @Output() remove = new EventEmitter();

  icons = {
    remove: faTimes
  }

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  removeProduct() {
    this.remove.emit(this.product);
  }

  // ir a la vista de detalles del producto
  goToDetails() {
    this.router.navigate(['product', this.product.id]);
  }

}
