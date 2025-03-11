import type { IAccount } from '../account/account.interface'
import type { IItem } from './item.interface'

export interface ICart {
  id: string
  creationDate: Date
  account: IAccount
  items: IItem[]
  createdAt: Date
  updatedAt: Date
}
