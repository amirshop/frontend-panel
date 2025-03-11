import type { IOrder } from './order.interface'

export interface IOrderLog extends IOrder {
  oldStatus?: string
  reasonForChange?: string
}
