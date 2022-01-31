import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Output() favAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addCart: EventEmitter<number> = new EventEmitter<number>();

  icons = {
    favAdd: faHeart,
    favDel: heartSolid,
    cartPlus: faCartPlus,
  }
  product: any;

  constructor() { }

  ngOnInit(): void {
  }

  favoriteAdd() {
    this.favAction.emit(true);
  }

  favoriteDel() {
    this.favAction.emit(false);
  }

  addCartFn() {
    this.addCart.emit(this.product.id);
  }

}
