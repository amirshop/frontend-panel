import { Product } from '../product/product.model'
import { CartModel } from './cart.Model'
import { Order } from '../order/order.model'

export interface ItemModel {
  id: string
  quantity: number
  price: number
  product: Product
  cart: CartModel
  order: Order
  createdAt: Date
  updatedAt: Date
}
