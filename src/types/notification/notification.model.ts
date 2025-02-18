import type { AccountModel } from "../account/account.model";

export interface NotificationModel {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  account: AccountModel;
  createdAt: Date;
  updatedAt: Date;
}
