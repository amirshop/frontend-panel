import type { ITag } from './tag.interface'
import type { IProductCategory } from './productCategory.interface'
import type { IProductReview } from './productReview.interface'

export interface IProduct {
  id: string
  name: string
  slug: string
  description: string
  price: number
  availableItemCount: number
  category: IProductCategory
  productReviews: IProductReview[]
  tags: ITag[]
  createdAt: Date
  updatedAt: Date
}
