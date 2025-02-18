import type { PermissionModel } from "./permission.model";

export interface RoleModel {
  id: string
  label: string
  value: string
  permissions: PermissionModel[]
  createdAt: Date
  updatedAt: Date
}
