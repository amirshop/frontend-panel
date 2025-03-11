import type { INotification } from './notification.interface'

export interface ISMSNotification extends INotification {
  phoneNumber: string
}
