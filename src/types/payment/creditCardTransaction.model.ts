import type { PaymentModel } from './payment.model'
import type { Address } from '../account/account.model'

export interface CreditCardTransaction extends PaymentModel {
  cardNumber: string
  nameOnCard: string
  billingAddress: Address
}
