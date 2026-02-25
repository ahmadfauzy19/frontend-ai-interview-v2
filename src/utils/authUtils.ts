import type { UserDataInterface } from '../pages/auth/Auth.interfaces';
import { storageService } from './storageUtils';

export function getUserAuth() {
  const userData: UserDataInterface = storageService.get('uid');

  if (userData) {
    return userData.isLogin;
  }

  return false;
}
