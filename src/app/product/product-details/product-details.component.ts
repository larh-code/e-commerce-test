import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCartPlus, faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  icons = {
    back: faArrowLeft,
    favAdd: faHeart,
    favDel: heartSolid,
    cartPlus: faCartPlus,
  }

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
