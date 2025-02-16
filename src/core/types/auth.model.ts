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

export namespace AuthDTO {
  export type Content = Auth
  export namespace Login {
    export type Request = Pick<AuthDTO.Content, 'username' | 'password'>
    export type Response = Omit<AuthDTO.Content, 'password'>
  }
  export type User = Pick<AuthDTO.Content, 'username' | 'id' | 'accessToken' | 'tokenType'>
}
