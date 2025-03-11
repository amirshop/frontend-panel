import type { IAccount } from "../account/account.interface";

export interface INotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  account: IAccount;
  createdAt: Date;
  updatedAt: Date;
}
