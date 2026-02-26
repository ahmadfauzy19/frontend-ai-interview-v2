import { injectLogout } from '@/utils/axiosUtils';
import { storageService } from '@/utils/storageUtils';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  AuthContextType,
  CustomJwtPayload,
  UserDataInterface,
  UserLoginInteface,
} from './AuthContext.interfaces.';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const data = storageService.get('uid');
    return !!data?.isLogin;
  });

  const [userData, setUserData] = useState<UserDataInterface>(() => {
    const data = storageService.get('uid');
    return data?.data;
  });

  const login = (data: UserLoginInteface) => {
    const decodedData: CustomJwtPayload = jwtDecode(data.token);
    const userData = {
      email: decodedData.sub ?? '',
      name: decodedData.name,
      role: decodedData.role,
      userId: decodedData.userId,
    };

    setUserData(userData);
    storageService.set('uid', {
      data: userData,
      isLogin: true,
      token: data.token,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    storageService.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    injectLogout(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
