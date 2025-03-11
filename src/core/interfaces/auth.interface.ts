/* eslint-disable @typescript-eslint/no-namespace */
export interface Auth {
  id: string
  username: string
  email: string
  roles: string
  tokenType: string
  accessToken: string
  password: string
}

export namespace IAuth {
  export type Content = Auth
  export namespace Login {
    export type Request = Pick<IAuth.Content, 'username' | 'password'>
    export type Response = Omit<IAuth.Content, 'password'>
  }
  export namespace Register {
    export type Request = Pick<IAuth.Content, 'username' | 'password'>
    export type Response = Omit<IAuth.Content, 'password'>
  }
  export type User = Pick<IAuth.Content, 'username' | 'id' | 'accessToken' | 'tokenType'>
}


const auth: IAuth.Login.Request = {
  username: "",
  password: ""
}