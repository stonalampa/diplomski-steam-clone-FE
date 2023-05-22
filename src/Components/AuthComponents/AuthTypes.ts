import { ReactNode } from 'react';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isAdmin: boolean;
  user: AuthUserType;
};

export enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

export type LoginParams = {
  email: string;
  password: string;
};

export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (params: LoginParams, isAdminPath: boolean) => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type GuestGuardProps = {
  children: ReactNode;
};

export type AuthGuardProps = {
  children: ReactNode;
};

export type ValidToken = { isExpired: boolean; isAdmin: boolean };
