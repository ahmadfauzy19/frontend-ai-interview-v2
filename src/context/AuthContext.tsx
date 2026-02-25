import React, { createContext, useContext, useState } from 'react';
import { storageService } from '../utils/storageUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  userData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const data = storageService.get('uid');
    return !!data?.isLogin;
  });

  const [userData, setUserData] = useState(() => {
    const storage = storageService.get('uid');
    return storage?.data;
  });

  const login = (data: any) => {
    storageService.set('uid', { data: data, isLogin: true });
    setUserData(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    storageService.clear();
    setUserData(null);
    setIsAuthenticated(false);
  };

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
