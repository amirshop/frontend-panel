import type { NotificationModel } from './notification.model'

export interface EmailNotification extends NotificationModel {
  email: string
}
