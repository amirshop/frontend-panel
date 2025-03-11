import type { IProduct } from './product.interface'
import type { IAccount } from '../account/account.interface'

export interface IProductReview {
  id: string
  rating: number
  reviewText: string
  product: IProduct
  reviewer: IAccount
  createdAt: Date
  updatedAt: Date
}
