import type { ShipmentStatusEnum } from '@/enums/shipmentStatus.enum'

export interface IShipment {
  id: string
  shipmentDate: Date
  estimatedArrival: Date
  shipmentMethod: string
  status: ShipmentStatusEnum
  createdAt: Date
  updatedAt: Date
}
