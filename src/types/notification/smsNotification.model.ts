import type { NotificationModel } from './notification.model'

export interface SMSNotification extends NotificationModel {
  phoneNumber: string
}
