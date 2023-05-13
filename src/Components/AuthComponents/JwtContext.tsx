import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { isValidToken, setSession } from './utils';
import { authenticationApi } from '../../providers/AuthenticationProvider';
import { IObject } from '../Common/Types';
// utils

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------
export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

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

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------
export type LoginParams = {
  email: string;
  password: string;
  afterSubmit?: string;
};
export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  loginWithGoogle?: () => void;
  loginWithMicrosoft?: () => void;
  loginWithJwt?: (jwt: string) => void;
};
export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function localStorageAvailable() {
  try {
    // Incognito mode might reject access to the localStorage for security reasons.
    // window isn't defined on Node.js
    // https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);

    window.localStorage.removeItem(key);

    return true;
  } catch (err) {
    return false;
  }
}
export const { useUserLoginMutation, useAdminLoginMutation } = authenticationApi;

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();
  const [loginLocal] = useUserLoginMutation();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const user = {};
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (params: LoginParams) => {
    const loginResult: IObject = await loginLocal(params);
    if (loginResult?.error) {
      throw new Error(loginResult?.error?.data?.message);
    }

    const { accessToken } = loginResult.data;
    loginWithJwt(accessToken);
  }, []);

  const loginWithJwt = useCallback(async (accessToken: string) => {
    const user = {};
    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      loginWithJwt,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
