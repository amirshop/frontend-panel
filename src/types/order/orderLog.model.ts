import type { OrderModel } from './order.model'

export interface OrderLog extends OrderModel {
  oldStatus?: string
  reasonForChange?: string
}
