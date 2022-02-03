import { IProduct } from 'src/app/product/models/product.model'

export interface ICart {
  products: IProduct[],
  total: number
}