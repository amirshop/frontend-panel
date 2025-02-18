import type { CartModel } from '../cart/cart.model'
import type { ProductReviewModel } from '../product/productReview.model'
import type { RoleModel } from './role.model'
import type { AccountStatusEnum } from '@/enums/accountStatus.enum'

export interface Address {
  streetAddress: string
  city: string
  state: string
  zipcode: string
  country: string
}

export interface AccountModel {
  id: string
  username: string
  password: string
  email: string
  phone: string
  firstname: string
  lastname: string
  status: AccountStatusEnum
  shippingAddress: Address
  cart: CartModel
  accountReviews: ProductReviewModel[]
  roles: RoleModel[]
  createdAt: Date
  updatedAt: Date
}
