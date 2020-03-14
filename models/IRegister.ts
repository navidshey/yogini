export interface IRegister {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
