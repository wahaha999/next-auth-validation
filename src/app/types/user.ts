export interface UserData {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
    email: string,
    username: string,
    password: string,
    password_confirm: string
}