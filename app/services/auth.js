import {useQuery, useMutation} from '@apollo/client';
import {
  REGISTER_MUTATION,
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_DETAIL_QUERY,
  LOGIN_MUTATION,
  GET_CURRENT_USER_QUERY,
  LOGOUT_MUTATION,
  ADD_ITEM_MUTATION,
  GET_CART_ITEM_QUERY,
  UPDATE_CART_LINE_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
  DELETE_ADDRESS_MUTATION,
  ADD_ADDRESS_MUTATION,
  UPDATE_ADDRESS_MUTATION,
  REMOVE_CART_LINE_MUTATION,
  GET_PAYMENT_METHOD_QUERY,
  GET_SHIPPING_METHOD_QUERY,
  SET_SHIPPING_METHOD_MUTATION,
  SET_ORDER_SHIPPING_ADDRESS_MUTATION,
  SET_ORDER_BILLING_ADDRESS_MUTATION,
  SET_STATE_MUTATION,
  SET_PAY_METHOD_MUTATION,
  GET_ALL_CATEGORIES_QUERY,
} from './query';

export const useCurrentUser = () => {
  return useQuery(GET_CURRENT_USER_QUERY);
};

export const useGetAllCategories = () => {
  return useQuery(GET_ALL_CATEGORIES_QUERY);
};

export const useAllProducts = () => {
  return useQuery(GET_ALL_PRODUCTS_QUERY);
};

export const useProducts = (ids, value, term) => {
  if (value === 'nameA') value = {name: 'ASC'};
  else if (value === 'nameZ') value = {name: 'DESC'};
  else if (value === 'price0') value = {price: 'ASC'};
  else if (value === 'price9') value = {price: 'DESC'};

  return useQuery(GET_PRODUCTS_QUERY, {variables: {ids, value, term: term}});
};

export const useProductDetail = slug => {
  return useQuery(GET_PRODUCT_DETAIL_QUERY, {variables: {slug}});
};

export const useRegisterUser = () => {
  return useMutation(REGISTER_MUTATION);
};

export const useLogin = () => {
  return useMutation(LOGIN_MUTATION);
};

export const useLogout = () => {
  return useMutation(LOGOUT_MUTATION);
};

export const useAddToCart = () => {
  return useMutation(ADD_ITEM_MUTATION);
};

export const useCartItem = () => {
  return useQuery(GET_CART_ITEM_QUERY);
};

export const useAdjustCart = () => {
  return useMutation(UPDATE_CART_LINE_MUTATION);
};

export const useRemoveCart = () => {
  return useMutation(REMOVE_CART_LINE_MUTATION);
};

export const useUpdateCustomer = () => {
  return useMutation(UPDATE_CUSTOMER_MUTATION);
};

export const useDeleteAddress = () => {
  return useMutation(DELETE_ADDRESS_MUTATION);
};

export const useAddAddress = () => {
  return useMutation(ADD_ADDRESS_MUTATION);
};

export const useChangeAddress = () => {
  return useMutation(UPDATE_ADDRESS_MUTATION);
};

export const useGetPayment = () => {
  return useQuery(GET_PAYMENT_METHOD_QUERY);
};

export const useGetShipping = () => {
  return useQuery(GET_SHIPPING_METHOD_QUERY);
};

export const useSetShipping = () => {
  return useMutation(SET_SHIPPING_METHOD_MUTATION);
};

export const useSetOrderShippingAddress = () => {
  return useMutation(SET_ORDER_SHIPPING_ADDRESS_MUTATION);
};

export const useSetOrderBillingAddress = () => {
  return useMutation(SET_ORDER_BILLING_ADDRESS_MUTATION);
};

export const useSetState = () => {
  return useMutation(SET_STATE_MUTATION);
};

export const useSetPaymentMethod = () => {
  return useMutation(SET_PAY_METHOD_MUTATION);
};
