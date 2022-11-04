import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = new HttpLink({
  uri: 'https://ecoapp.rachhen.com/shop-api',
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get('vendure-auth-token');

    // console.log('get: ' + authHeader);
    if (authHeader) {
      AsyncStorage.setItem('auth_token', authHeader);
    }
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([
    setContext(async () => {
      const authToken = await AsyncStorage.getItem('auth_token');

      if (authToken) {
        // console.log('set: ' + authToken);
        return {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };
      }
    }),
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          GET_CART_ITEM_QUERY: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
