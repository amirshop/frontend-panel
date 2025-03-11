import type { PaymentStatusEnum } from '@/enums/paymentStatus.enum'

export interface IPayment {
  id: string
  amount: number
  status: PaymentStatusEnum
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
}
