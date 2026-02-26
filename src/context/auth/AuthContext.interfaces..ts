import type { JwtPayload } from 'jwt-decode';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: UserLoginInteface) => void;
  logout: () => void;
  userData: UserDataInterface;
}

export interface UserLoginInteface {
  token: string;
  type: string;
}

export interface UserDataInterface {
  role: string;
  name: string;
  userId: string;
  email: string;
}

export interface CustomJwtPayload extends JwtPayload {
  role: string;
  name: string;
  userId: string;
}
