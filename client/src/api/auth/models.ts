
export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
    date: Date;
  }

  
  export type IRegister = IUser | Error;