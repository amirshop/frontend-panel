import type { IPayment } from '../payment/payment.interface'
import type { IShipment } from '../shipment/shipment.interface'
import type { IItem } from '../cart/item.interface'
import type { OrderStatusEnum } from '@/enums/orderStatus.enum'

export interface IOrder {
  id: string
  orderNumber: string
  orderProcessor: string
  status: OrderStatusEnum
  orderDate: Date
  payments: IPayment[]
  shipments: IShipment[]
  items: IItem[]
  createdAt: Date
  updatedAt: Date
}

export type OrderTest = {
  id: string
  title: string
  price: number
  isActive: boolean
  createdAt: Date
}
