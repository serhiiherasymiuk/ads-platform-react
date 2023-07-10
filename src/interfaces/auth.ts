export interface IRegister {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResult {
  access_token: string;
}
