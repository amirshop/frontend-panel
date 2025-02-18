import type { PaymentStatusEnum } from '@/enums/paymentStatus.enum'

export interface PaymentModel {
  id: string
  amount: number
  status: PaymentStatusEnum
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
}
