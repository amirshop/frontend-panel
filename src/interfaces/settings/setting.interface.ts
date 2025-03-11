/* eslint-disable @typescript-eslint/no-namespace */
import { ColorsEnum } from '@/enums/setting.enum'
import type { IAccount } from '@/interfaces/account/account.interface'

export interface ShopSetting {
  id: string
  title: string
  slug: string
  description: string
  logo: string
  favicon: string
  primaryColor: ColorsEnum
  currency: string
  createdAt: Date
  updatedAt: Date
}

export namespace IShopSetting {
  export namespace Create {
    export type Param = IAccount['id']
    export type Request = Omit<ShopSetting, 'id' | 'createdAt' | 'updatedAt'>
    export type Response = ShopSetting
  }

  export namespace Get {
    export type Param = IAccount['id']
    export type Response = ShopSetting
  }
  export namespace Update {
    export type Param = IAccount['id']
    export type Request = Omit<ShopSetting, 'id' | 'createdAt' | 'updatedAt'>
    export type Response = ShopSetting
  }
  export namespace Delete {
    export type Param = IAccount['id']
    export type Response = ShopSetting
  }
}
