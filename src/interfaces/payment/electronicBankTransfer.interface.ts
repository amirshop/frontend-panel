import type { IPayment } from './payment.interface'

export interface IElectronicBankTransfer extends IPayment {
  bankAccount: string
  routingNumber: string
}
