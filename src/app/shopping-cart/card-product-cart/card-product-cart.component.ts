import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'

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

  constructor() { }

  ngOnInit(): void {
  }

  removeProduct() {
    this.remove.emit(this.product);
  }

}
