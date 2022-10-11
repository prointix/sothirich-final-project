import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useContext} from 'react';
import {useCurrentUser, useLogout} from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = props => {
  const [user, setUser] = useState(null);
  const [cartID, setCartID] = useState(null);
  const [itemsCart, setItemsCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const {data} = useCurrentUser();
  const [logoutUser, {error}] = useLogout();

  const login = async () => {
    setLoading(true);
    if (loading === false) {
      setUser(data.activeCustomer);

      data.activeCustomer?.orders.items.map(item => {
        if (item.state === 'AddingItems') {
          setCartID(item.id);
          if (item.totalQuantity !== '0') {
            setItemsCart(item.totalQuantity);
          }
        }
      });
    }
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    logoutUser({});
    AsyncStorage.removeItem('auth_token');
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (data) {
      setUser(data.activeCustomer);

      data.activeCustomer?.orders.items.map(item => {
        if (item.state === 'AddingItems') {
          setCartID(item.id);
          if (item.totalQuantity !== '0') {
            setItemsCart(item.totalQuantity);
          }
        }
      });

      setLoading(false);
    }
  }, [data, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        logout,
        login,
        cartID,
        itemsCart,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
