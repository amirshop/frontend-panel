import type { ICart } from '../cart/cart.interface'
import type { IProductReview } from '../product/productReview.interface'
import type { IRole } from './role.interface'
import type { AccountStatusEnum } from '@/enums/accountStatus.enum'

export interface IAddress {
  streetAddress: string
  city: string
  state: string
  zipcode: string
  country: string
}

export interface IAccount {
  id: string
  username: string
  password: string
  email: string
  phone: string
  firstname: string
  lastname: string
  status: AccountStatusEnum
  shippingAddress: IAddress
  cart: ICart
  accountReviews: IProductReview[]
  roles: IRole[]
  createdAt: Date
  updatedAt: Date
}
