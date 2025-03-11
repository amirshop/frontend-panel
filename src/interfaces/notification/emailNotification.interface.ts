import type { INotification } from './notification.interface'

export interface IEmailNotification extends INotification {
  email: string
}
