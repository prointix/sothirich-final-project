import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useContext} from 'react';
import {useCartItem, useCurrentUser, useLogout} from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = props => {
  const [user, setUser] = useState(null);
  const [itemsCart, setItemsCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const {data, refetch: refetchUser} = useCurrentUser();
  const {data: data1, refetch: refetchCart} = useCartItem();
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [logoutUser, {error}] = useLogout();

  const logout = () => {
    setLoading(true);
    AsyncStorage.removeItem('auth_token');
    logoutUser({});
    setUser(null);
    setItemsCart(null);
    setLoading(false);
  };

  const reloadCart = async () => {
    await refetchCart();
  };

  const reloadUser = async () => {
    await refetchUser();
  };

  useEffect(() => {
    setLoading(true);
    if (data) {
      setUser(data.activeCustomer);
      setLoading(false);

      data.activeCustomer?.addresses.map(address => {
        address.defaultShippingAddress && setShippingAddress(address);
        address.defaultBillingAddress && setBillingAddress(address);
      });
    }

    data1 && setItemsCart(data1.activeOrder);
  }, [data, data1]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        logout,
        itemsCart,
        shippingAddress,
        billingAddress,
        reloadCart,
        reloadUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
