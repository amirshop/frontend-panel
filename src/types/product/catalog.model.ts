import type { ProductModel } from './product.model'

export interface CatalogModel {
  id: string
  name: string
  lastUpdated: Date
  products: ProductModel[]
  createdAt: Date
  updatedAt: Date
}
