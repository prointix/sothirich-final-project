import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://vendure.up.railway.app/shop-api',
  cache: new InMemoryCache(),
});

export default client;
