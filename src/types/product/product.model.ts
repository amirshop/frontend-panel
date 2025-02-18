import type { TagModel } from './tag.model'
import type { ProductCategoryModel } from './productCategory.model'
import type { ProductReviewModel } from './productReview.model'

export interface ProductModel {
  id: string
  name: string
  slug: string
  description: string
  price: number
  availableItemCount: number
  category: ProductCategoryModel
  productReviews: ProductReviewModel[]
  tags: TagModel[]
  createdAt: Date
  updatedAt: Date
}
