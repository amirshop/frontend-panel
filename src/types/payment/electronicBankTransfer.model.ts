import type { PaymentModel } from './payment.model'

export interface ElectronicBankTransfer extends PaymentModel {
  bankAccount: string
  routingNumber: string
}
