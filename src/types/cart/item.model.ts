import type { ProductModel } from '../product/product.model'
import type { CartModel } from './cart.model'
import type { OrderModel } from '../order/order.model'

export interface ItemModel {
  id: string
  quantity: number
  price: number
  product: ProductModel
  cart: CartModel
  order: OrderModel
  createdAt: Date
  updatedAt: Date
}
