export interface TRegister {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  isDoc: boolean;
  age: number;
}

export interface TUser {
  userName: string;
  id: string;
  email: string;
  photo?: string;
}

export interface TAuthContext {
  user: null | TUser;
  loading: boolean;
  status: "authenticated" | "unauthenticated";
  login: (email: string, password: string) => void;
  register: (p: TRegister) => void;
  logout: () => void;
}
