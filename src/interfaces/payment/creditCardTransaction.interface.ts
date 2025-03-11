import type { IPayment } from './payment.interface'
import type { IAddress } from '../account/account.interface'

export interface CreditCardTransaction extends IPayment {
  cardNumber: string
  nameOnCard: string
  billingAddress: IAddress
}
