export interface IUserToken {
  id: string;
}

export type IdentityBody<T = any> = T & { identity: IUserToken };

export interface IVerifyBody {
  password: string;
}
