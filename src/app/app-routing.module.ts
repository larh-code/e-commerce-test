import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then((m) => m.ShoppingCartModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
