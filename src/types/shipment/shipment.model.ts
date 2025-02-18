import type { ShipmentStatusEnum } from '@/enums/shipmentStatus.enum'

export interface ShipmentModel {
  id: string
  shipmentDate: Date
  estimatedArrival: Date
  shipmentMethod: string
  status: ShipmentStatusEnum
  createdAt: Date
  updatedAt: Date
}
