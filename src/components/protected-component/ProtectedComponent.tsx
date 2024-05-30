import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { isVaildToken } from '../../utils/utils';
import { Login } from '../../pages/login/Login';

export const ProtectedComponent = ({children}: any) => {
  const { token } = useAuth();
  const isLogged = isVaildToken(token !== null ? token : '');
  const returnComponent = isLogged ? children : <Login />;

  return returnComponent;
}