import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CardProductComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [ CardProductComponent ]
})
export class CardProductModule { }
