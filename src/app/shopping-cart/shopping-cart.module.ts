import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import {
  CardProductCartComponent
} from './card-product-cart/card-product-cart.component'
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module'
import { ShoppingCartComponent } from './shopping-cart.component'

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CardProductCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FontAwesomeModule,
  ]
})
export class ShoppingCartModule { }
