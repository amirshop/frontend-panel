import type { AccountModel } from "../account/account.model";
import type { ItemModel } from "./item.model";

export interface CartModel {
  id: string;
  creationDate: Date;
  account: AccountModel;
  items: ItemModel[];
  createdAt: Date;
  updatedAt: Date;
}
