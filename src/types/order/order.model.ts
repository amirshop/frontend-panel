import type { PaymentModel } from '../payment/payment.model'
import type { ShipmentModel } from '../shipment/shipment.model'
import type { ItemModel } from '../cart/item.model'
import type { OrderStatusEnum } from '@/enums/orderStatus.enum'

export interface OrderModel {
  id: string
  orderNumber: string
  orderProcessor: string
  status: OrderStatusEnum
  orderDate: Date
  payments: PaymentModel[]
  shipments: ShipmentModel[]
  items: ItemModel[]
  createdAt: Date
  updatedAt: Date
}
