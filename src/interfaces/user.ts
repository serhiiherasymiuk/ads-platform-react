export enum AuthUserActionType {
  LOGIN_USER = "AUTH_LOGIN_USER",
  LOGOUT_USER = "AUTH_LOGOUT_USER",
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  profilePicture: string;
  registrationDate: string;
  phoneNumber: string;
  roles: string[];
}

export interface IUserEdit {
  userName: string;
  email: string;
  phoneNumber: string;
  profilePicture: File | null;
}

export interface IAuthUser {
  isAuth: boolean;
  user?: IUser;
}
