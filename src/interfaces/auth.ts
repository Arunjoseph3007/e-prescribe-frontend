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
  fullName: string;
  userName: string;
  id: string;
  email: string;
  isDoctor: boolean;
  photo?: string;
  age: null | number;
}

export interface TAuthContext {
  user: null | TUser;
  loading: boolean;
  status: "authenticated" | "unauthenticated";
  login: (email: string, password: string) => void;
  register: (p: TRegister) => void;
  logout: () => void;
}
