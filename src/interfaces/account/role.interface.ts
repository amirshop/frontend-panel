import type { IPermission } from "./permission.interface";

export interface IRole {
  id: string
  label: string
  value: string
  permissions: IPermission[]
  createdAt: Date
  updatedAt: Date
}
