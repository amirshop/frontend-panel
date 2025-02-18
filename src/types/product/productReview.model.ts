import type { ProductModel } from './product.model'
import type { AccountModel } from '../account/account.model'

export interface ProductReviewModel {
  id: string
  rating: number
  reviewText: string
  product: ProductModel
  reviewer: AccountModel
  createdAt: Date
  updatedAt: Date
}
