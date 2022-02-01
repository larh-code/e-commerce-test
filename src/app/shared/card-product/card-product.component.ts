import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
    console.log('add cart')
    // this.addCart.emit(this.product.id);
    this.addCart.emit(1);
  }

  goToDetails() {
    // this.router.navigate(['product', this.product.id]);
    this.router.navigate(['product', 1]);
  }

}
