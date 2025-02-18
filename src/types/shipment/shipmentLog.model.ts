import type { ShipmentStatusEnum } from '@/enums/shipmentStatus.enum'
import type { ShipmentModel } from './shipment.model'

export interface ShipmentLog extends ShipmentModel {
  updatedAt: Date
  oldStatus?: ShipmentStatusEnum
  reasonForUpdate?: string
}
