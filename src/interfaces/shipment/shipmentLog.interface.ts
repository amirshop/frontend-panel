import type { ShipmentStatusEnum } from '@/enums/shipmentStatus.enum'
import type { IShipment } from './shipment.interface'

export interface IShipmentLog extends IShipment {
  updatedAt: Date
  oldStatus?: ShipmentStatusEnum
  reasonForUpdate?: string
}
