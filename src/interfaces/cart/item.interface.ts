import type { IProduct } from '../product/product.interface'
import type { ICart } from './cart.interface'
import type { IOrder } from '../order/order.interface'

export interface IItem {
  id: string
  quantity: number
  price: number
  product: IProduct
  cart: ICart
  order: IOrder
  createdAt: Date
  updatedAt: Date
}
