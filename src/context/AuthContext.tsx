import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth';
import type { ApiResponse, AuthResponse, User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

type FlexibleAuthResponse = AuthResponse & {
  accessToken?: string;
  data?: Partial<AuthResponse> & {
    accessToken?: string;
    user?: User;
  };
};

type FlexibleUserResponse = ApiResponse<User> & {
  user?: User;
};

const getAuthSession = (response: AuthResponse): { token: string; user: User } => {
  const res = response as FlexibleAuthResponse;
  const token = res.token || res.accessToken || res.data?.token || res.data?.accessToken;
  const user = res.user || res.data?.user;

  if (!token || !user) {
    throw new Error('Login succeeded, but the server response was missing authentication data.');
  }

  return { token, user };
};

const getUserFromResponse = (response: ApiResponse<User>): User => {
  const res = response as FlexibleUserResponse;
  const user = res.data || res.user;

  if (!user) {
    throw new Error('Could not verify the current user.');
  }

  return user;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // On mount (or when token changes), verify the token with the backend
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getMe();
        setUser(getUserFromResponse(res));
      } catch {
        // Token expired or invalid — clear it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const res = await authService.login(email, password);
    const session = getAuthSession(res);

    localStorage.setItem('token', session.token);
    setUser(session.user);
    setToken(session.token);
    return session.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const value: AuthContextValue = { user, token, loading, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
