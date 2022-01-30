import { Component, OnInit } from '@angular/core';
import { faBars, faSearch, faShoppingBasket, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icons = {
    bars: faBars,
    shoppingCart: faShoppingCart,
  }
  timeOutSearch: any = null;
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  searchProduct() {
    clearTimeout(this.timeOutSearch);
    this.timeOutSearch = setTimeout(() => {
      console.log('result', this.searchValue)
    }, 300);
  }

  cleanSearch() {
    this.searchValue = '';
    console.log('result clean', this.searchValue)
  }

}
