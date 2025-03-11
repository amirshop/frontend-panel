import type { IProduct } from './product.interface'

export interface ICatalog {
  id: string
  name: string
  lastUpdated: Date
  products: IProduct[]
  createdAt: Date
  updatedAt: Date
}
