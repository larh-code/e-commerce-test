import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import {
  CardProductModule
} from '../shared/components/card-product/card-product.module'
import {
  ProductDetailsComponent
} from './product-details/product-details.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductRoutingModule } from './product-routing.module'

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CardProductModule,
    FontAwesomeModule,
  ]
})
export class ProductModule { }
